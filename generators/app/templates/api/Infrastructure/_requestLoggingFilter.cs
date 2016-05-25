using System;
using System.Diagnostics;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using CorrelatorSharp.Logging;

namespace <%= appNameDotNamespace %>.Api.Infrastructure
{
    public class RequestLoggingFilter : IActionFilter
    {
        private static readonly ILogger _requestLogger = LogManager.GetLogger("Request");

        public async Task<HttpResponseMessage> ExecuteActionFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken,
            Func<Task<HttpResponseMessage>> continuation)
        {
            LogStartRequest(actionContext);

            Stopwatch timer = Stopwatch.StartNew();

            HttpResponseMessage response = null;
            try
            {
                response = await continuation();
            }
            finally
            {
                timer.Stop();
                LogEndOfRequest(actionContext, response, timer.ElapsedMilliseconds);
            }

            return response;
        }

        public bool AllowMultiple => false;

        private static void LogStartRequest(HttpActionContext httpContext)
        {
            if (httpContext == null)
                return;

            _requestLogger.LogTrace("\"url\": \"{0}\"", httpContext.Request?.RequestUri?.PathAndQuery);
        }

        private static void LogEndOfRequest(HttpActionContext actionContext, HttpResponseMessage response, long duration)
        {
            if (actionContext == null)
                return;

            if (_requestLogger.IsInfoEnabled)
            {
                _requestLogger.LogInfo("\"url\": \"{0}\", \"absoluteUrl\": \"{1}\", \"duration\": {2}, \"status\": {3}",
                                       actionContext.Request?.RequestUri?.PathAndQuery,
                                       actionContext.Request?.RequestUri?.AbsolutePath,
                                       duration.ToString("0"),
                                       ((int?)(actionContext.Response?.StatusCode ?? response?.StatusCode)) ?? 0);
            }
        }
    }
}