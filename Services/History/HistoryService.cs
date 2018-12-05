using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;
        private readonly IMapper mapper;
        public HistoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
        }
        public async Task<IEnumerable<HistoryViewModel>> FindByRequestAsync(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: r => r.Id == id,
                                                            include: r => r.Include(rr => rr.History));

            List<HistoryViewModel> historyVm = new List<HistoryViewModel>();
            mapper.Map<IEnumerable<History>, List<HistoryViewModel>>(request.History, historyVm);
            return historyVm;
        }
    }
}