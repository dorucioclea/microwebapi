using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using CorrelatorSharp.WebApi;
using <%= appNameDotNamespace %>.Api.Infrastructure;

namespace <%= appNameDotNamespace %>.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Filters.Add(new CorrelationIdActionFilter());
            config.Filters.Add(new RequestLoggingFilter());
        }
    }
}
