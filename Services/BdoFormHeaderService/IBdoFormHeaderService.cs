using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IBdoFormHeaderService
    {
        Task SaveChangesAsync();
        Task<Request> FindAsync(int id);
        void Update(Request request, int status);
    }

    
}