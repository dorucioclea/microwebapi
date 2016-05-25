using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using <%= appNameDotNamespace %>.Api.Controllers;
using <%= appNameDotNamespace %>.Api.Services;
using Ninject;
using Ninject.Web.Common;

namespace <%= appNameDotNamespace %>.Api
{
    public static class NinjectConfig
    {
        public static IKernel CreateKernel()
        {
            StandardKernel kernel = new StandardKernel();
            RegisterServices(kernel);
            return kernel;
        }
        
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IValuesService>().To<ValuesService>().WhenInjectedExactlyInto<ValuesController>().InRequestScope();
        }
    }
}