import React, { Fragment, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CategoryRPC } from '@/src/crm/@types/categoryrpc';
import { restApi } from '@/api';
import { toast } from 'react-toastify';
import { parse } from 'path';

interface Props {
  account?: CategoryRPC;
  dialogOpen: boolean;
  fetchCategoryRPC: () => Promise<void>;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CategoryRPCSaveDialog: React.FC<Props> = ({
  dialogOpen,
  fetchCategoryRPC,
  setDialogOpen,
  account,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryRPC>();
  const isCreate = account === undefined;

  useEffect(() => {
    if (account !== undefined) {
      reset(account);
    }
  }, [account]);
  const onSubmit: SubmitHandler<CategoryRPC> = async (data) => {
    if (isCreate) {
      console.log(data);
      await restApi.post('/category-rpc', {
        category: data.category,
        country: data.country,
        rpc: parseFloat(data.RPC),
      });
      toast.success('CategoryRPC created successfully');
    } else {
      await restApi.put(`/category-rpc/${account?.id}`, {
        category: data.category,
        country: data.country,
        RPC: parseFloat(data.RPC),
      });
      toast.success('CategoryRPC edited successfully');
    }
    setDialogOpen(false);
    await fetchCategoryRPC();
  };
  return (
    <div>
      <input
        type="checkbox"
        checked={dialogOpen}
        style={{ display: 'none' }}
        onChange={() => {}}
        readOnly={true}
        className="hidden modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {isCreate ? 'Create' : 'Update'}
          </h3>
          <form
            action={''}
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="py-4">
              <div>
                <label className="label">
                  <span className="text-base label-text">Category</span>
                </label>
                <input
                  {...register('category')}
                  type="text"
                  placeholder="Category"
                  className="w-full input input-bordered input-primary"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base label-text">Country</span>
                </label>
                <input
                  {...register('country')}
                  type="text"
                  placeholder="Country"
                  className="w-full input input-bordered input-primary"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base label-text">RPC</span>
                </label>
                <input
                  {...register('RPC')}
                  type="text"
                  placeholder="RPC"
                  className="w-full input input-bordered input-primary"
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-error"
                type={'button'}
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Close
              </button>
              <button className="btn btn-primary" type={'submit'}>
                {isCreate ? 'Create' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryRPCSaveDialog;
