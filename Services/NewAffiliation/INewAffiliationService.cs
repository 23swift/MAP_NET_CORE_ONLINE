using System.Threading.Tasks;
using MAP_Web.Models;

namespace MAP_Web.Services
{
    public interface INewAffiliationService
    {
        void UpdateRequest(Request request, int status);
        Task<Request> FindAsync(int id);
        Task SaveChangesAsync();
    }
}