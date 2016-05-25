using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using <%= appNameDotNamespace %>.Api.Services;

namespace <%= appNameDotNamespace %>.Api.Controllers
{
    public class ValuesController : ApiController
    {
        private readonly IValuesService _valuesService;

        public ValuesController(IValuesService valuesService)
        {
            _valuesService = valuesService;
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return _valuesService.GetValues();
        }

        // GET api/values/5
        public string Get(int id)
        {
            return _valuesService.GetValue();
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
