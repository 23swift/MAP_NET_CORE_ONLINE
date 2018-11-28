using System.Threading.Tasks;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IRequestHeaderService
    {
         Task<RequestHeaderViewModel> FindAsync(int id);
    }
}