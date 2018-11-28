using System.Collections.Generic;
using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class DropdownMapping : Profile
    {
        public DropdownMapping()
        {
            CreateMap<ICollection<MaintenanceDetails>, IEnumerable<DropdownViewModel>>();
        }
    }
}