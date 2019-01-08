using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IMDCSUserService
    {
        bool ValidateMid(int id);
    }
}