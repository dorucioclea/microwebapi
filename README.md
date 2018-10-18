# generator-microwebapi

Yeoman generator for building micro services in ASP.NET WebAPI 2

> Lets you quickly create a new web service with:
> * WebAPI 2 running on .NET 4.6
> * OWIN Pipeline
> * CorrelatorSharp logging with LogEntires and NLog support
> * Automatically logs all inbound and outbound requests
> * Ninject
> * Swagger
> * Unit, integration, and acceptance testing using MSpec or NUnit
> * Generates a random port number for IIS Express

## Folder Structure

> The following folder structure will be generated

```
 - {NameSpace}.{AppName}.Api
 - {NameSpace}.{AppName}.Tests.Acceptance
 - {NameSpace}.{AppName}.Tests.Integration
 - {NameSpace}.{AppName}.Tests.Unit
```

## Usage

### Install
We assume you have pre-installed [node.js](https://nodejs.org/)

##### Install required tools `yo`:

```
npm install -g yo
```

##### Install `generator-microwebapi`:

```
npm install -g generator-microwebapi
```

### Run

##### Create a new directory, and go into:

```
mkdir my-new-project && cd $_
```

##### Run `yo microwebapi`, enter your namespace and project name:

```
yo microwebapi
```

##### Run the solution:

> * Open the *.sln in Visual Studio and press the ```F5``` key to download the dependencies and start the webservice:
> * Test out swagger by browsing to ```http://localhost:{port}/swagger```
> * There are two sample endpoints implements
> * Use the API key value of ```somekey``` to explore the API

##### 


## Ideas for Future Enhancements

> Some of the future items that will be added to the project are:

> * Option to select Entity Framework or Dapper
> * Sample unit, integration, and acceptance tests
> * NewRelic integration
