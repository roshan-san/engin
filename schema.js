
startup={

startupid : int ,//each startup has a uniqueid to recognize it , will be generated automatically when startup is created
startupname : string ,//name of the startup , will get it when startup is created
problem : string ,//problem that the startup is solving , while startup is created
solution : string ,//solution , while startup is created
industry : string ,//industry of the startup, while startup is created
pitchdeck: string ,//pitchdeck of the startup, while startup is created
teamsize : int ,//team size of the startup, while startup is created
patent: string ,//patent info, while startup is created
funding : int ,//funding required by the startup ,while startup is created
location : string ,//location of the startup, ippothaiku manual
description : string ,//description of the startup
founded : date ,//date when the startup was founded automatically generated
openroles : [role,role,role],//array of open roles in the startup
founder : profileid ,//this is the profile id of the founder , will be useful to redirect to profile page
collaborators : [profileid,profileid,profileid], //same as above , but for collaborators
investors : [profileid,profileid,profileid],//same as above , but for investors


}
user={
    
avatar: string ,//link to profilephoto , will get it from oauth provider (google,github)
name : string ,//name of the user , will get it from oauth provider (google,github)
email : string ,//email of the user , will get it from oauth provider (google,github)

type : string ,//type of the user (mentor, creator/collaborator, investor), will get it when onboarding

username: string ,//username of the user , will get it when onboarding
bio: string ,//description of the user , will get it when onboarding

skills : [string,string,string],//array of skills of the user , will get it when onboarding
areasofinterest : [string,string,string],//array of areas of interest of the user , will get it when onboarding
experience: string ,//experience of the user , will get it when onboarding

location : string ,//location of the user,  will get it when onboarding
availablefor: string ,//(fulltime,parttime,contract), will get it when onboarding ,should be automatically updated if hired by founder

linkedin: string,//linkedin profile of the user,  will get it when onboarding
github: string,//github profile of the user,  will get it when onboarding

connections: [username,username,],//array of connections of the user , will be updated when user connects with another user
pendingrequests :[username,username,],//array of pending requests to connect with the user , will be updated when user gets a request
appliedstartups : [startupid,startupid,startupid],//array of startups that the user has applied to , will be updated when user applies to a startup
instartups : [startupid,startupid],//current startup that the user is working with , will be updated when user is hired by founder
role:[]
}
role={
    name : string ,//name of the role
    requirements : string ,//requirements of the role
    description : string ,//description of the role
    skills: [string,string,string],//skills required for the role
    experience: string ,//experience required for the role
    equity: int ,//equity offered by the startup for this role
    type : string ,//type of the role (fulltime,parttime,contract)
}