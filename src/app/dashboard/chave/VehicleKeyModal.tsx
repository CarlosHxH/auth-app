import React from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,Stack} from '@mui/material';
import { User, Vehicle, VehicleKey, VehicleKeyFormData } from './Types';
import Loading from '@/components/Loading';
import { Form, useForm } from 'react-hook-form';
import ComboBox from '@/components/ComboBox';

interface VehicleKeyModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: VehicleKeyFormData) => void;
  vehicleKey?: VehicleKey;
  users: User[];
  vehicles: Vehicle[];
  availableParents: VehicleKey[];
}

export const VehicleKeyModal: React.FC<VehicleKeyModalProps> = ({ open, onClose, onSave, vehicleKey, users, vehicles, availableParents }) => {
  const { reset, watch, setValue, control, formState: { isSubmitting } } = useForm<VehicleKeyFormData>({defaultValues: {}});

  const selectedVehicleId = watch('vehicleId');

  React.useEffect(() => {
    if (selectedVehicleId) {
      const lastParentKey = availableParents
        .filter(key => key.vehicle.id === selectedVehicleId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
      
      if (lastParentKey) setValue('parentId', lastParentKey.id);
      else setValue('parentId', null);
    }
  }, [selectedVehicleId, availableParents, setValue]);

  React.useEffect(() => {
    reset()
    vehicleKey?.id && Object.entries(vehicleKey).forEach(([key, value]) => {
      if (["user", "vehicle"].includes(key)) return;
      setValue(key as keyof VehicleKeyFormData, value)
    })
  }, [vehicleKey, reset, setValue])

  if(isSubmitting) return <Loading/>

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Form
        method={!!vehicleKey?.id? "put":"post"}
        action={"/api/admin/keys"}
        encType={'application/json'}
        onSuccess={async ({ response }) => {
          reset();
          const res = await response.json()
          onSave(res);
          onClose();
        }}
        onError={async (error) => {
          reset();
          alert("Erro ao enviar os dados!");
          if (error.response) {
            const res = await error.response.json();
            console.log(res);
            alert("Error ao criar!")
          } else {
            console.log(error);
          }
        }}
        control={control}
      >
        <DialogTitle>
          {vehicleKey ? 'Edit Vehicle Key' : 'Add New Vehicle Key'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <ComboBox name="vehicleId" label="Veículo" options={vehicles.map((v) => ({label: `${v.plate} - ${v.model}`,value: v.id}))} control={control} rules={{ required: true }}/>
            <ComboBox name="userId" label="Usuario" options={users.map((v) => ({label: `${v.name}`,value: v.id}))} control={control} rules={{ required: true }}/>
            <ComboBox 
              name="parentId"
              label="Parent Key" 
              options={availableParents.filter(data => data.vehicle.id === selectedVehicleId).map((key) => ({
                  label: `${key.vehicle.plate} - ${key.user.name}`,
                  value: key.id
                }))}
              control={control}
              disabled
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};