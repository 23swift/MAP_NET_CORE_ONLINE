using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using MAP_Web.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Controllers {
    [Route ("/api/maef")]
    public class MAEFController : Controller {
        private readonly IMAEFService maefService;

        private readonly IBdoFormHeaderService bdoFormHeaderService;

        private readonly ICustomerProfileService customerProfileService;

        private readonly IReturnRemarksService returnRemarksService;

      //  private readonly ClaimsViewModel claimsVm;
        private readonly string name;

        private readonly IMapper mapper;
        public MAEFController (IMAEFService maefService, IBdoFormHeaderService bdoFormHeaderService, ICustomerProfileService customerProfileService, IMapper mapper, IReturnRemarksService returnRemarksService, IHttpContextAccessor claims) {
            this.mapper = mapper;
            this.maefService = maefService;
            this.bdoFormHeaderService = bdoFormHeaderService;
            this.customerProfileService = customerProfileService;
            this.returnRemarksService = returnRemarksService;

        /*    var id = new ClaimsIdentity(User.Claims, "Forms", "name", "role");
            var claims = id.Claims.ToList();
            claimsVm = new ClaimsViewModel {
                name = claims.Where(c => c.Type == "name").SingleOrDefault().Value,
                rank = claims.Where(c => c.Type == "rank").SingleOrDefault().Value,
                role = claims.Where(c => c.Type == "role").Select(s => s.Value),
                access = claims.Where(c => c.Type == "access").Select(s => s.Value)
            }; */
            var name = claims.HttpContext.User.Claims.ToList().SingleOrDefault(c => c.Type == "name").Value;
           // var role = claims.HttpContext.User.Claims.ToList().SingleOrDefault(c => c.Type == "role").Value;    

        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> GetMAEF (int id) {
            var maef = await maefService.FindAsync (id);

            if (maef == null)
                return Ok (new MAEF ());

            return Ok (maef);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMAEF ([FromBody] MAEF maef) {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            await maefService.InsertAsync (maef);
            await maefService.SaveChangesAsync ();

            return Ok (maef);
        }

        [HttpPut ("{id}")]
        public async Task<IActionResult> UpdateMAEF ([FromBody] MAEFViewModel maef, int id) {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            var currentMaef = await maefService.FindAsyncMaefId (id);

            if (currentMaef == null)
                return NotFound ();

            mapper.Map<MAEFViewModel, MAEF> (maef, currentMaef);
            await maefService.Update (currentMaef);
            await maefService.SaveChangesAsync ();

            return Ok (currentMaef);
        }

        [HttpPost ("history")]
        public async Task<IActionResult> CreateHistory ([FromBody] History history) {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            await maefService.InsertRemarksAsync (history);
            await maefService.SaveChangesAsync ();

            return Ok (history);
        }

        [HttpGet ("history/{id}/{actions}")]
        public async Task<IActionResult> GetRemarks (int id, string actions) {
            var history = await maefService.FindRemarksAsync (id, actions);

            if (history == null)
                return NotFound ();

            return Ok (history);
        }

        [HttpGet ("historyCheck/{id}/{actions}")] // check if already contain remarks
        public async Task<IActionResult> CheckRemarks (int id, string actions) {
            var history = await maefService.CheckRemarksAsync (id, actions);

            if (history == null)
                return Ok (false);

            return Ok (true);
        }

        [HttpPut ("returnToAo/{id}")] //by ao checker 
        public async Task<IActionResult> ReturnToAo (int id) {
            var request = await bdoFormHeaderService.FindAsync (id);
            var actionsCode = "Return To AO";
            var currentHistory = await maefService.FindRemarksAsync (id, actionsCode);
            var history = new History {
            RequestId = id,
            actionCode = currentHistory.actionCode,
            remarks = currentHistory.remarks,
            action = "Return To AO: Submitted",
            user = currentHistory.user,
            groupCode = currentHistory.groupCode,
            date = DateTime.Now,
            };
            await maefService.InsertRemarksAsync (history);
            await maefService.SaveChangesAsync ();

            bdoFormHeaderService.Update (request, 26);
            await bdoFormHeaderService.SaveChangesAsync ();
            return Ok ();
        }

        [HttpPut ("returnToAoByMAMO/{id}")]
        public async Task<IActionResult> ReturnToAoByMAMO (int id) {
            var request = await bdoFormHeaderService.FindAsync (id);
            var actionsCode = "Return To AO By MAMO";
            var currentHistory = await maefService.FindRemarksAsync (id, actionsCode);
            var history = new History {
            RequestId = id,
            actionCode = currentHistory.actionCode,
            remarks = currentHistory.remarks,
            action = "Return To AO By MAMO: Submitted",
            user = currentHistory.user,
            groupCode = currentHistory.groupCode,
            date = DateTime.Now,
            };
            await maefService.InsertRemarksAsync (history);
            await maefService.SaveChangesAsync ();

            bdoFormHeaderService.Update (request, 27);
            await bdoFormHeaderService.SaveChangesAsync ();
            return Ok ();
        }

        [HttpPut ("returnToAoByApprover/{id}")]
        public async Task<IActionResult> ReturnToAoByApprover (int id) {
            var request = await bdoFormHeaderService.FindAsync (id);
            var actionsCode = "Return To AO By Approver";
            var currentHistory = await maefService.FindRemarksAsync (id, actionsCode);
            var history = new History {
            RequestId = id,
            actionCode = currentHistory.actionCode,
            remarks = currentHistory.remarks,
            action = "Return To AO By Approver: Submitted",
            user = currentHistory.user,
            groupCode = currentHistory.groupCode,
            date = DateTime.Now,
            };
            await maefService.InsertRemarksAsync (history);
            await maefService.SaveChangesAsync ();

            bdoFormHeaderService.Update (request, 28);
            await bdoFormHeaderService.SaveChangesAsync ();
            return Ok ();
        }

        [HttpPut ("returnToMamo/{id}")]
        public async Task<IActionResult> ReturnToMamo (int id) {
            var request = await bdoFormHeaderService.FindAsync (id);
            var actionsCode = "Return To MAMO";

            var currentHistory = await maefService.FindRemarksAsync (id, actionsCode);
            var history = new History {
                RequestId = id,
                actionCode = currentHistory.actionCode,
                remarks = currentHistory.remarks,
                action = "Return To MAMO: Submitted",
                user = currentHistory.user,
                groupCode = currentHistory.groupCode,
                date = DateTime.Now,
            };
            await maefService.InsertRemarksAsync (history);
            await maefService.SaveChangesAsync ();

            bdoFormHeaderService.Update (request, 10);
            await bdoFormHeaderService.SaveChangesAsync ();
            return Ok ();
        }

        [HttpPut ("decline/{id}")]
        public async Task<IActionResult> Decline (int id) {
            var request = new RequestApproval { user = name, requestId = id, approve = false };
            var finalApprover = true;
            var appIfFinalCount = await bdoFormHeaderService.CheckRequestApproveCount (id);
            await bdoFormHeaderService.InsertAsync (request);
            await bdoFormHeaderService.SaveChangesAsync ();
            var actionsCode = "Decline";
            var currentHistory = await maefService.FindRemarksAsync (id, actionsCode);
            var history = new History {
            RequestId = id,
            actionCode = currentHistory.actionCode,
            remarks = currentHistory.remarks,
            action = "Decline: Decline Count 1",
            user = currentHistory.user,
            groupCode = currentHistory.groupCode,
            date = DateTime.Now,
            };

            var appCount = await bdoFormHeaderService.DeclineCountAsync (id);
            var appSetup = await bdoFormHeaderService.GetApproveCount (id);


            var requestRecords = await bdoFormHeaderService.FindAsync (id);
            var requestStatus = requestRecords.Status;         
            if(appIfFinalCount == appSetup && requestStatus == 8 && finalApprover == true)
            {
                var requestData = await bdoFormHeaderService.FindAsync (id);
                bdoFormHeaderService.Update (requestData, 2);
                history.action = "Decline: Approved";
                await bdoFormHeaderService.SaveChangesAsync ();                
            }
            else 
            {
            if (appCount >= appSetup) {
                var requestData = await bdoFormHeaderService.FindAsync (id);
                bdoFormHeaderService.Update (requestData, 2);
                history.action = "Decline: Approved";
                await bdoFormHeaderService.SaveChangesAsync ();
            }
            }
            await maefService.InsertRemarksAsync (history);
            await maefService.SaveChangesAsync ();
            return Ok ();
        }

        // not final start
        [HttpPut ("reSubmitRequestChecker/{id}")]
        public async Task<IActionResult> ReSubmitRequestChecker (int id) {
            var request = await bdoFormHeaderService.FindAsync (id);
            var actionsCode = "Re-submit To Checker";
            //var currentHistory = await maefService.FindRemarksAsync (id, actionsCode);
            var history = new History {
            RequestId = id,
            actionCode = actionsCode,
            remarks = "",
            action = "Re-submit To Checker: Submitted",
            user = name,
            groupCode = "",
            date = DateTime.Now,
            };
            await maefService.InsertRemarksAsync (history);
            await maefService.SaveChangesAsync ();

            bdoFormHeaderService.Update (request, 2);
            await bdoFormHeaderService.SaveChangesAsync ();
            return Ok ();
        }

        [HttpPut ("reSubmitRequestMAMO/{id}")]
        public async Task<IActionResult> ReSubmitRequestMAMO (int id) {
            var request = await bdoFormHeaderService.FindAsync (id);
            var actionsCode = "Re-submit To MAMO";
            var currentHistory = await maefService.FindRemarksAsync (id, actionsCode);
            var history = new History {
            RequestId = id,
            actionCode = currentHistory.actionCode,
            remarks = currentHistory.remarks,
            action = "Re-submit To MAMO: Submitted",
            user = currentHistory.user,
            groupCode = currentHistory.groupCode,
            date = DateTime.Now,
            };
            await maefService.InsertRemarksAsync (history);
            await maefService.SaveChangesAsync ();

            bdoFormHeaderService.Update (request, 5);
            await bdoFormHeaderService.SaveChangesAsync ();
            return Ok ();
        }

        [HttpPut ("reSubmitRequestApprover/{id}")]
        public async Task<IActionResult> ReSubmitRequestApprover (int id) {
            var request = await bdoFormHeaderService.FindAsync (id);
            var actionsCode = "Re-submit To Approver";
            var currentHistory = await maefService.FindRemarksAsync (id, actionsCode);
            var history = new History {
            RequestId = id,
            actionCode = currentHistory.actionCode,
            remarks = currentHistory.remarks,
            action = "Re-submit To Approver: Submitted",
            user = currentHistory.user,
            groupCode = currentHistory.groupCode,
            date = DateTime.Now,
            };
            await maefService.InsertRemarksAsync (history);
            await maefService.SaveChangesAsync ();

            bdoFormHeaderService.Update (request, 8);
            await bdoFormHeaderService.SaveChangesAsync ();
            return Ok ();
        }

        [HttpPut ("reSubmitRequestMQR/{id}")]
        public async Task<IActionResult> ReSubmitRequestMQR (int id) {
            var request = await bdoFormHeaderService.FindAsync (id);
            var actionsCode = "Re-submit To MQR";
            var currentHistory = await maefService.FindRemarksAsync (id, actionsCode);
            var history = new History {
            RequestId = id,
            actionCode = currentHistory.actionCode,
            remarks = currentHistory.remarks,
            action = "Re-submit To MQR: Submitted",
            user = currentHistory.user,
            groupCode = currentHistory.groupCode,
            date = DateTime.Now,
            };
            await maefService.InsertRemarksAsync (history);
            await maefService.SaveChangesAsync ();

            bdoFormHeaderService.Update (request, 30);
            await bdoFormHeaderService.SaveChangesAsync ();
            return Ok ();
        }
        // not final end

        [HttpPut ("submitToApprover/{id}")]
        public async Task<IActionResult> SubmitToApprover (int id) {
            var request = await bdoFormHeaderService.FindAsync (id);
            bdoFormHeaderService.Update (request, 8);
            var currentMaef = await maefService.FindAsync(id);
            currentMaef.processedBy = name;
            currentMaef.processedDate = DateTime.Now;
            await maefService.Update (currentMaef); 
            var customerProfile = await customerProfileService.FindAsync (id);
            var approvalMatrix = await customerProfileService.FindApproveMatrixAsync(customerProfile.ownership, request.RequestType);
           foreach (var item in approvalMatrix.Items)
           {
               await maefService.InsertRequiredApprovalAsync(new RequiredApproval{
                    approvalCount = item.approvalCount,
                    rank = item.rank,
                    user = name,
                    requestId = id,
                    finalApprover = item.finalApprover,
                });
           }
            await maefService.SaveChangesAsync ();
            await bdoFormHeaderService.SaveChangesAsync ();
            return Ok ();
        }

        [HttpPut ("approve/{id}")]
        public async Task<IActionResult> Approve (int id) {
            var finalApprover = true;
            var appIfFinalCount = await bdoFormHeaderService.CheckRequestApproveCount (id);
            var request = new RequestApproval { user = name, requestId = id, approve = true };
            await bdoFormHeaderService.InsertAsync (request);
            await bdoFormHeaderService.SaveChangesAsync ();

            var actionsCode = "Approve";
            var history = new History {
            RequestId = id,
            actionCode = actionsCode,
            user = name,
            groupCode = "mauEncoder",
            date = DateTime.Now,
            action = "Approve: Approve Count 1",
            };
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            var maef = await maefService.FindAsync (id);

            if (maef == null)
                return NotFound ();

            if (maef.approver1 == null) {
                maef.approver1 = name;
                maef.decisionDate1 = DateTime.Now;
                maef.approverDecision1 = actionsCode;
            } else if (maef.approver2 == null) {
                maef.approver2 = name;
                maef.decisionDate2 = DateTime.Now;
                maef.approverDecision2 = actionsCode;
            } else if (maef.approver3 == null) {
                maef.approver3 = name;
                maef.decisionDate3 = DateTime.Now;
                maef.approverDecision3 = actionsCode;
            }
            await maefService.Update (maef);

            await maefService.SaveChangesAsync ();

            var appCount = await bdoFormHeaderService.ApproveCountAsync (id); //count approve on requestapproval table
            var appSetup = await bdoFormHeaderService.GetApproveCount (id); //count approval count on requiredapproval table


            var requestRecords = await bdoFormHeaderService.FindAsync (id);
            var requestStatus = requestRecords.Status;
            /*update status*/
            if(appIfFinalCount == appSetup && requestStatus == 8 && finalApprover == true)
            {
                if (maef.chkWithReq && maef.chkWithException && maef.chkApprovePendingCust) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 16);
                    history.action = "Approve: APPROVED WRWEPC";
                } else if (maef.chkWithReq && maef.chkApprovePendingCust) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 17);
                    history.action = "Approve: APPROVED WRPC";
                } else if (maef.chkWithReq && maef.chkWithException) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 18);
                    history.action = "Approve: APPROVED WRWE";
                } else if (maef.chkApprove) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 11);
                    history.action = "Approve: APPROVED";
                } else if (maef.chkDecline) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 12);
                    history.action = "Approve: DECLINED";
                } else if (maef.chkWithReq) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 13);
                    history.action = "Approve: APPROVED WR";
                } else if (maef.chkWithException) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 15);
                    history.action = "Approve: APPROVED WE";
                } else if (maef.chkApprovePendingCust) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 14);
                    history.action = "Approve: APPROVED PC";
                }

                await bdoFormHeaderService.SaveChangesAsync ();
            }
            else
            {
        
              if (appCount >= appSetup) {
                if (maef.chkWithReq && maef.chkWithException && maef.chkApprovePendingCust) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 16);
                    history.action = "Approve: APPROVED WRWEPC";
                } else if (maef.chkWithReq && maef.chkApprovePendingCust) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 17);
                    history.action = "Approve: APPROVED WRPC";
                } else if (maef.chkWithReq && maef.chkWithException) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 18);
                    history.action = "Approve: APPROVED WRWE";
                } else if (maef.chkApprove) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 11);
                    history.action = "Approve: APPROVED";
                } else if (maef.chkDecline) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 12);
                    history.action = "Approve: DECLINED";
                } else if (maef.chkWithReq) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 13);
                    history.action = "Approve: APPROVED WR";
                } else if (maef.chkWithException) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 15);
                    history.action = "Approve: APPROVED WE";
                } else if (maef.chkApprovePendingCust) {
                    var requestData = await bdoFormHeaderService.FindAsync (id);
                    bdoFormHeaderService.Update (requestData, 14);
                    history.action = "Approve: APPROVED PC";
                }

                await bdoFormHeaderService.SaveChangesAsync ();


            }
        }
                await maefService.InsertRemarksAsync (history);
                await maefService.SaveChangesAsync ();
            return Ok ();
        }

        [HttpGet ("approvalCount/{id}")]
        public async Task<IActionResult> ApprovalCount (int id) {
            var appCount = await bdoFormHeaderService.ApproveCountAsync (id);

            return Ok (appCount);
        }

        [HttpGet ("userCount/{id}")]
        public async Task<IActionResult> UserCount (int id) {
            var appCount = await bdoFormHeaderService.CheckUserCountAsync(id);

            return Ok (appCount);
        }      

        [HttpGet ("userSetup/{id}")]
        public async Task<IActionResult> GetApproveCount (int id) {
            var appCount = await bdoFormHeaderService.GetApproveCount (id);

            return Ok (appCount);
        }

        [HttpGet ("returnRemarks/{id}/{status}")] 
        public async Task<IActionResult> GetReturnRemarks (int id, int status) {
            var returnRemarks = await returnRemarksService.FindByRequestAsync (id, status);
       
            var mappedReturnRemarks = mapper.Map<IList<Remark>, IList<RemarkViewModel>>(returnRemarks.Items);

            return Ok (mappedReturnRemarks);
        } 

        [HttpGet ("lastRemarks/{id}/{status}")]
        public async Task<IActionResult> GetLastRemarks (int id, int status) {
            var returnRemarks = await returnRemarksService.FindLastRemarksAsync (id, status);
            return Ok (returnRemarks);
        }

        [HttpPost ("remarks")]
        public async Task<IActionResult> CreateRemarks ([FromBody] Remark remark)
        {
            await returnRemarksService.InsertRemarksAsync (remark);
            await returnRemarksService.SaveChangesAsync ();

            return Ok (remark);
        }

        [HttpPut ("remarks/{id}")]
        public async Task<IActionResult> UpdateRemarks ([FromBody] RemarkViewModel remark, int id) {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            var currentRemarks = await returnRemarksService.FindAsync (id);

            if (currentRemarks == null)
                return NotFound ();

            mapper.Map<RemarkViewModel, Remark> (remark, currentRemarks);
            await returnRemarksService.Update (currentRemarks);
            await returnRemarksService.SaveChangesAsync ();

            return Ok (currentRemarks);
        }

        [HttpGet("remark/{id}")]
        public async Task<IActionResult> GetRemark(int id)
        {
            var remark  = await returnRemarksService.FindAsync (id);
            return Ok (remark);
        }

        [HttpGet("checkUserRemarks/{id}/{user}")]
        public async Task<IActionResult> CheckUserRemarks(int id, string user)
        {
         var remark = await returnRemarksService.CheckRemarkAsync(id, user);
         
         return Ok (new { remarks = remark });
        }
    }
}