using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class ApproveWithReqReasonMapping : Profile
    {
        public ApproveWithReqReasonMapping()
        {
            CreateMap<ApproveWithReqReasonViewModel, ApproveWithReqReason>()
                .ForMember(a => a.Id, opt => opt.Ignore());
        }
    }
}