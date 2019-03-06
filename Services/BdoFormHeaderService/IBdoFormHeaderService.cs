using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MAP_Web.Services
{
    public interface IBdoFormHeaderService
    {
        Task SaveChangesAsync();
        Task<Request> FindAsync(int id);
        void Update(Request request, int status);
        Task<int> ApproveCountAsync(int requestId);
        Task<int> DeclineCountAsync(int requestId);
        Task<int> CheckUserCountAsync(int requestId, string user);
        Task InsertAsync(RequestApproval requestApproval);
        Task<int> GetApproveCount(int requestId);
        Task<int> CheckRequestApproveCount(int requestId);
    }

    
}