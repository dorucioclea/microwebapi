'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var guid = require('uuid');
var mkdirp = require('mkdirp');
var rn = require('random-number');

var microWebApiGenerator = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },

  init: function () {
    this.log(this.yeoman);
    this.log(yosay('Welcome to the WebApi micro service scaffolding generator!'));
    this.appData = {};
  },

  askForAppData: function () {
    var done = this.async();

    this.prompt([{
      type: 'input',
      name: 'applicationName',
      message: 'What is the name of your application?',
      default: 'MyApplication',
      required: true
    }, {
      type: 'input',
      name: 'namespace',
      message: 'What is the projects namespace?',
      default: 'MyNamespace',
      required: true
    }, {
      type: 'input',
      name: 'logEntiresToken',
      message: 'What is your log entries api token?',
      default: '',
      required: false
    }], function (props) {
      this.appData = props;
      this.appData.applicationName = props.applicationName;
      this.appData.namespace = props.namespace;
      this.appData.appNameDotNamespace = props.namespace + '.' + props.applicationName;
      this.appData.solutionName = props.applicationName.replace(/\s+/g, '');
      this.appData.applicationFolder = props.namespace + '.' + props.applicationName.replace(/\s+/g, '') + '.Api';
      this.appData.testsAcceptanceFolder = props.namespace + '.' + props.applicationName.replace(/\s+/g, '') + '.Tests.Acceptance';
      this.appData.testsIntegrationFolder = props.namespace + '.'  + props.applicationName.replace(/\s+/g, '') + '.Tests.Integration';
      this.appData.testsUnitFolder = props.namespace +  '.' + props.applicationName.replace(/\s+/g, '') + '.Tests.Unit';
      this.appData.apiProjectGuid = guid.v4();
      this.appData.apiAssemblyGuid = guid.v4();
      this.appData.testsUnitProjectGuid = guid.v4();
      this.appData.testsUnitAssemblyGuid = guid.v4();
      this.appData.testsIntegrationProjectGuid = guid.v4();
      this.appData.testsIntegrationAssemblyGuid = guid.v4();
      this.appData.testsAcceptanceProjectGuid = guid.v4();
      this.appData.testsAcceptanceAssemblyGuid = guid.v4();
      this.appData.portNumber = rn({min: 19000, max: 32000, integer: true});
      this.appData.logEntiresToken = props.logEntiresToken;
      done();
    }.bind(this));
  },

  writing: function () {
    this.sourceRoot(path.join(__dirname, '../templates/projects/webapi'));
  },

  appPaths: function () {
    this.packagesDirectory = path.join(this.destinationRoot(), 'packages');
    this.appDirectory = path.join(this.destinationRoot(), this.appData.applicationFolder);
    this.appStart = path.join(this.appDirectory, 'App_Start/');
    this.controllersDirectory = path.join(this.appDirectory, 'Controllers');
    this.servicesDirectory = path.join(this.appDirectory, 'Sellers');
    this.propertiesDirectory = path.join(this.appDirectory, 'Properties');
    this.testAcceptanceDirectory = path.join(this.destinationRoot(), this.appData.testsAcceptanceFolder);
    this.testIntegrationDirectory = path.join(this.destinationRoot(), this.appData.testsIntegrationFolder);
    this.testUnitDirectory = path.join(this.destinationRoot(), this.appData.testsUnitFolder);
    this.testAcceptancePropertiesDirectory = path.join(this.testAcceptanceDirectory, 'Properties');
    this.testIntegratioPropertiesDirectory = path.join(this.testIntegrationDirectory, 'Properties');
    this.testUnitDirectoryPropertiesDirectory = path.join(this.testUnitDirectory, 'Properties');
  },

  createDirectories: function () {
    mkdirp(this.packagesDirectory);
    mkdirp(this.appDirectory);
    mkdirp(this.appStart);
    mkdirp(this.controllersDirectory);
    mkdirp(this.servicesDirectory);
    mkdirp(this.propertiesDirectory);
    mkdirp(this.testAcceptanceDirectory);
    mkdirp(this.testAcceptancePropertiesDirectory);
    mkdirp(this.testIntegratioPropertiesDirectory);
    mkdirp(this.testUnitDirectoryPropertiesDirectory);
  },

  createAppStartFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/App_Start/_webapiconfig.cs'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'App_Start/WebApiConfig.cs')), {appNameDotNamespace: this.appData.appNameDotNamespace}
      );
    this.fs.copyTpl(
      this.templatePath('api/App_Start/_loggingConfig.cs'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'App_Start/LoggingConfig.cs')), {appNameDotNamespace: this.appData.appNameDotNamespace}
      );
    this.fs.copyTpl(
      this.templatePath('api/App_Start/_ninjectConfig.cs'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'App_Start/NinjectConfig.cs')), {appNameDotNamespace: this.appData.appNameDotNamespace}
      );
    this.fs.copyTpl(
      this.templatePath('api/App_Start/_swaggerConfig.cs'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'App_Start/SwaggerConfig.cs')), {appNameDotNamespace: this.appData.appNameDotNamespace}
      );
  },

  createPropertiesFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Properties/_assemblyinfo.cs'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'Properties/AssemblyInfo.cs')),
      {
        appNameDotNamespace: this.appData.appNameDotNamespace,
        apiAssemblyGuid: this.appData.apiAssemblyGuid
      }
    );
    this.fs.copyTpl(
      this.templatePath('tests.acceptance/Properties/_assemblyinfo.cs'),
      this.destinationPath(path.join(this.appData.testsAcceptanceFolder, 'Properties/AssemblyInfo.cs')),
      {
        appNameDotNamespace: this.appData.appNameDotNamespace,
        testsAcceptanceAssemblyGuid: this.appData.testsAcceptanceAssemblyGuid
      }
    );
    this.fs.copyTpl(
      this.templatePath('tests.integration/Properties/_assemblyinfo.cs'),
      this.destinationPath(path.join(this.appData.testsIntegrationFolder, 'Properties/AssemblyInfo.cs')),
      {
        appNameDotNamespace: this.appData.appNameDotNamespace,
        testsIntegrationAssemblyGuid: this.appData.testsIntegrationAssemblyGuid
      }
    );
    this.fs.copyTpl(
      this.templatePath('tests.unit/Properties/_assemblyinfo.cs'),
      this.destinationPath(path.join(this.appData.testsUnitFolder, 'Properties/AssemblyInfo.cs')),
      {
        appNameDotNamespace: this.appData.appNameDotNamespace,
        testsUnitAssemblyGuid: this.appData.testsUnitAssemblyGuid,
      }
    );

  },

  createControllerFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Controllers/_valuescontroller.cs'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'Controllers/ValuesController.cs')), {appNameDotNamespace: this.appData.appNameDotNamespace}
      );
  },

  createServiceFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Services/_valuesService.cs'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'Services/ValuesService.cs')), {appNameDotNamespace: this.appData.appNameDotNamespace}
      );
  },

  createInfrastructureFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Infrastructure/_requestLoggingFilter.cs'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'Infrastructure/RequestLoggingFilter.cs')), {appNameDotNamespace: this.appData.appNameDotNamespace}
    );
  },

  createRootFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/_packages.config'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'Packages.config'))
      );
    this.loggingConfig = '';
    this.fs.copyTpl(
      this.templatePath('api/_web.config'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'Web.config')),
      {
        applicationName: this.appData.applicationName,
        dbServerName: this.appData.dbServerName,
        logEntiresToken: this.appData.logEntiresToken
      }
      );
    this.fs.copyTpl(
      this.templatePath('api/_web.debug.config'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'Web.Debug.config'))
      );
    this.fs.copyTpl(
      this.templatePath('api/_web.release.config'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'Web.Release.config'))
      );
    this.fs.copyTpl(
      this.templatePath('api/_api.csproj'),
      this.destinationPath(path.join(this.appData.applicationFolder, this.appData.appNameDotNamespace + '.Api.csproj')),
      {
        appNameDotNamespace: this.appData.appNameDotNamespace,
        apiProjectGuid: this.appData.apiProjectGuid,
        portNumber: this.appData.portNumber
      }
    );
    this.fs.copyTpl(
      this.templatePath('api/_startup.cs'),
      this.destinationPath(path.join(this.appData.applicationFolder, 'Startup.cs')), {appNameDotNamespace: this.appData.appNameDotNamespace}
    );
    this.fs.copyTpl(
      this.templatePath('tests.acceptance/_tests.acceptance.csproj'),
      this.destinationPath(path.join(this.appData.testsAcceptanceFolder, this.appData.appNameDotNamespace + '.Tests.Acceptance.csproj')),
      {
        applicationName: this.appData.applicationName,
        testsAcceptanceProjectGuid: this.appData.testsAcceptanceProjectGuid,
      }
    );
    this.fs.copyTpl(
      this.templatePath('tests.acceptance/_packages.config'),
      this.destinationPath(path.join(this.appData.testsAcceptanceFolder, 'Packages.config'))
    );
    this.fs.copyTpl(
      this.templatePath('tests.integration/_tests.integration.csproj'),
      this.destinationPath(path.join(this.appData.testsIntegrationFolder, this.appData.appNameDotNamespace + '.Tests.Integration.csproj')),
      {
        applicationName: this.appData.applicationName,
        testsIntegrationProjectGuid: this.appData.testsIntegrationProjectGuid,
      }
    );
    this.fs.copyTpl(
      this.templatePath('tests.integration/_packages.config'),
      this.destinationPath(path.join(this.appData.testsIntegrationFolder, 'Packages.config'))
    );
    this.fs.copyTpl(
      this.templatePath('tests.unit/_tests.unit.csproj'),
      this.destinationPath(path.join(this.appData.testsUnitFolder, this.appData.appNameDotNamespace + '.Tests.Unit.csproj')),
      {
        applicationName: this.appData.applicationName,
        testsUnitProjectGuid: this.appData.testsUnitProjectGuid,
      }
    );
    this.fs.copyTpl(
      this.templatePath('tests.unit/_packages.config'),
      this.destinationPath(path.join(this.appData.testsUnitFolder, 'Packages.config'))
    );
  },

  createOutterFiles: function () {
    this.fs.copyTpl(
      this.templatePath('_app.sln'),
      this.destinationPath(this.appData.solutionName + '.sln'),
      {
        applicationName: this.appData.applicationName,
        appNameDotNamespace: this.appData.appNameDotNamespace,
        apiProjectGuid: this.appData.apiProjectGuid,
        testsUnitProjectGuid: this.appData.testsUnitProjectGuid,
        testsIntegrationProjectGuid: this.appData.testsIntegrationProjectGuid,
        testsAcceptanceProjectGuid: this.appData.testsAcceptanceProjectGuid,
        applicationFolder: this.appData.applicationFolder,
        testsAcceptanceFolder: this.appData.testsAcceptanceFolder,
        testsIntegrationFolder: this.appData.testsIntegrationFolder,
        testsUnitFolder: this.appData.testsUnitFolder
      }
      );
    this.fs.copyTpl(
      this.templatePath('packages/_repositories.config'),
      this.destinationPath('packages/repositories.config'), {applicationName: this.appData.applicationName}
      );
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    this.log('\r\n');
    this.log('Your project is now created.');
    this.log(this.appData.applicationName);
  }
});

module.exports = microWebApiGenerator;
