using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class MAEFMapping : Profile
    {
    public MAEFMapping()
        {
            CreateMap<MAEFViewModel, MAEF>()
                .ForMember(m => m.Id, opt => opt.Ignore())
                .ForMember(m => m.RequestId, opt => opt.Ignore());
        }
    }
}