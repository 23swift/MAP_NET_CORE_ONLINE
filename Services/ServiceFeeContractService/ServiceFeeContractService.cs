using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class ServiceFeeContractService : IServiceFeeContractService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<ServiceFeeContract> _serviceFeeContractRepo;
        public ServiceFeeContractService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _serviceFeeContractRepo = _unitOfWork.GetRepository<ServiceFeeContract>();
        }
        public async Task<ServiceFeeContract> FindByIdAsync(int id)
        {
            return await _serviceFeeContractRepo.FindAsync(id);
        }
        public async Task<IPagedList<ServiceFeeContract>> GetServiceFeeContractList()
        {
            return await _serviceFeeContractRepo.GetPagedListAsync();
        }
        public async Task Insert(ServiceFeeContract serviceFeeContract)
        {
            await _serviceFeeContractRepo.InsertAsync(serviceFeeContract);
        }
        public void Update(ServiceFeeContract serviceFeeContract)
        {
            _serviceFeeContractRepo.Update(serviceFeeContract);
        }
        public void Delete(ServiceFeeContract serviceFeeContract)
        {
            _serviceFeeContractRepo.Delete(serviceFeeContract);
        }
        public async Task SaveChangesAsync()
        {
            await _unitOfWork.SaveChangesAsync();
        }
    }
}