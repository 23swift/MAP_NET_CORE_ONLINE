using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class ApproveWithExceptDetailsMapping : Profile
    {
        public ApproveWithExceptDetailsMapping()
        {
            CreateMap<ApproveWithExceptDetailsViewModel, ApproveWithExceptDetails>()
                .ForMember(a => a.Id, opt => opt.Ignore());
        }
    }
}