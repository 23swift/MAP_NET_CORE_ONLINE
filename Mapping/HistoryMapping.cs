using System.Collections.Generic;
using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_NET_CORE_ONLINE.Mapping
{
    public class HistoryMapping : Profile
    {
        public HistoryMapping()
        {
            CreateMap<History, HistoryViewModel>();
        }
    }
}