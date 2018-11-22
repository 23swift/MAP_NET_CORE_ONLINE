using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class CustomerProfileMapping : Profile
    {
        public CustomerProfileMapping()
        {
            CreateMap<CustomerProfileViewModel, CustomerProfile>()
                .ForMember(cp => cp.Id, opt => opt.Ignore())
                .ForMember(cp => cp.NewAffiliationId, opt => opt.Ignore());
        }
    }
}