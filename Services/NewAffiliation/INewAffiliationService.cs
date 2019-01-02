using System.Threading.Tasks;
using MAP_Web.Models;

namespace MAP_Web.Services
{
    public interface INewAffiliationService
    {
        Task UpdateRequest(Request request, int status);
        Task<Request> FindAsync(int id);
        bool ValidateFieldsForMdcs(Request request);
        Task<Request> FindWithNavigationAsync(int id);
        Task SaveChangesAsync();
    }
}