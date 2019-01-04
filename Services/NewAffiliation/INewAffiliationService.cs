using System.Threading.Tasks;
using MAP_Web.Models;
using System.Collections.Generic;

namespace MAP_Web.Services
{
    public interface INewAffiliationService
    {
        Task UpdateRequest(Request request, int status);
        Task<Request> FindAsync(int id);
        Task<IEnumerable<Branch>> FindPosByRequestAsync(int id);
        void UpdatePOSForMdcsChecker(Task<IEnumerable<Branch>> Branches);
        bool ValidateFieldsForMdcs(Request request);
        Task<Request> FindWithNavigationAsync(int id);
        Task SaveChangesAsync();
    }
}