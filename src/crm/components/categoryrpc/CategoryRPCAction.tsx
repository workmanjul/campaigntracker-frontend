import React, { useState } from 'react';
import { CategoryRPC } from '@/src/crm/@types/categoryrpc';
import { restApi } from '@/api';
import { toast } from 'react-toastify';
import CategoryRPCSaveDialog from '@src/crm/components/categoryrpc/CategoryRPCSaveDialog';
interface Props {
  categoryRPC: CategoryRPC;
  fetchCategoryRPC: () => Promise<void>;
}
const CategoryRPCAction: React.FC<Props> = ({
  categoryRPC,
  fetchCategoryRPC,
}) => {
  const { id } = categoryRPC;
  const [dialogOpen, setDialogOpen] = useState(false);
  const deleteAdAccount = async () => {
    if (confirm('Are you sure?')) {
      await restApi.delete(`/category-rpc/${id}`);
      toast.success('CategoryRPC deleted successfully');
      await fetchCategoryRPC();
    }
  };
  const handleEditClick = () => {
    setDialogOpen(true);
  };
  return (
    <div>
      {dialogOpen && (
        <CategoryRPCSaveDialog
          dialogOpen={dialogOpen}
          fetchCategoryRPC={fetchCategoryRPC}
          setDialogOpen={setDialogOpen}
          account={categoryRPC}
        />
      )}
      <button
        className={'btn btn-primary mr-1 btn-sm'}
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Edit
      </button>
      <button className={'btn btn-error btn-sm'} onClick={deleteAdAccount}>
        Delete
      </button>
    </div>
  );
};

export default CategoryRPCAction;
