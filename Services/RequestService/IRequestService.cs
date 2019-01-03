
using System.Threading.Tasks;

namespace MAP_Web.Services
{
    public interface IRequestService
    {
         Task<int> GetStatus(int id);
    }
}