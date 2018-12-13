using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface ICustomerProfileService
    {
         Task InsertAsync(CustomerProfile customerProfile);
         Task<CustomerProfile> FindAsync(int id);
         Task<CustomerProfile> FindByRequestAsync(int id);
         Task SaveChangesAsync();
         Task Update(CustomerProfile customerProfile);
         void Delete(CustomerProfile customerProfile);
    }
}