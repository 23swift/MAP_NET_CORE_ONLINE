using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IServiceFeeContractService
    {
        Task<ServiceFeeContract> FindByIdAsync(int id);
        Task<IPagedList<ServiceFeeContract>> GetServiceFeeContractList();
        Task Insert(ServiceFeeContract serviceFeeContract);
        void Update(ServiceFeeContract serviceFeeContract);
        void Delete(ServiceFeeContract serviceFeeContract);
        Task SaveChangesAsync();
    }
}