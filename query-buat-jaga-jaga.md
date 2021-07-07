sq model:generate --name Brand --attributes brand_name:string;
sq model:generate --name Collection --attributes name:string,BrandId:integer;
sq model:generate --name Caliber --attributes name:string,BrandId:integer;
sq model:generate --name BraceletColor --attributes name:string;
sq model:generate --name Movement --attributes name:string;
sq model:generate --name Clasp --attributes name:string;
sq model:generate --name BezelMaterial --attributes name:string;
sq model:generate --name ClaspMaterial --attributes name:string;
sq model:generate --name DialMaterial --attributes name:string;
sq model:generate --name BraceletMaterial --attributes name:string;
sq model:generate --name Function --attributes name:string;

sq model:generate --name WatchModel --attributes referenceNumber:string,caseMaterial:string,caseDiameter:integer,caseThickness:integer,waterResistance:integer,glass:string,streetName:string,lugWidth:string,introducedAt:string,powerReserved:integer,numberOfJewel:integer,dialNumeral:string,otherInfo:string,CollectionId:integer,CaliberId:integer,MovementId:integer,BezelMaterialId:integer,DialMaterialId:integer,BraceletMaterialId:integer,BraceletColorId:integer,ClaspId:integer,ClaspMaterialId:integer,FunctionId:integer;
sq model:generate --name Condition --attributes name:string;
sq model:generate --name Accompany --attributes name:string;
sq model:generate --name ProductStatus --attributes name:string;
sq model:generate --name Boutique --attributes name:string,description:string,address:string,fullAddress:string,avatar:string,longitude:integer,latitude:integer,UserId:integer;

sq model:generate --name User --attributes firstName:string,middleName:string,lastName:string,email:string,username:string,password:string,googleConnect:boolean,appleConnect:boolean,facebookConnect:boolean,mobile:string,picture:string,config:string,RoleId:integer,SubscriptionId:integer,StatusId:integer;

sq model:generate --name Role --attributes name:string;
sq model:generate --name Subscription --attributes name:string;
sq model:generate --name UserStatus --attributes name:string;
sq model:generate --name Rating --attributes rating:integer,comment:string,UserId:integer;

sq model:generate --name TransactionStatus --attributes name:string;
sq model:generate --name Transaction --attributes price:integer,currencry:string,StatusId:integer,BuyerProductId:integer,SellerProductId:integer;

sq model:generate --name TransactionInfo --attributes description:string,TransactionId:integer;
sq model:generate --name TransactionRating --attributes rating:integer,comment:string,UserId:integer,TransactionId:integer;

sq model:generate --name Product --attributes year:string,price:integer,currency:string,description:string,topImage:string,crownSideImage:string,caseBackImage:string,showOffImage:string,ReferenceId:integer,ConditionId:integer,AccompanyId:integer,BoutiqueId:integer,ProductStatusId:integer,MatchProductId:integer