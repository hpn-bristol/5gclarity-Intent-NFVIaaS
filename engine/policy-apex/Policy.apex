
#----------------------------------------------------------------------------------------------------------------------------------------------------------------

model create name=Intent_Policy_Model

#----------------------------------------------------------------------------------------------------------------------------------------------------------------

##-- Primitive Types --##

schema create		name=String_Type			flavour=Java		schema=java.lang.String
schema create 		name=Object_Type			flavour=Java		schema=java.lang.Object
schema create 		name=Double_Type			flavour=Java		schema=java.lang.Double
schema create 		name=Float_Type				flavour=Java		schema=java.lang.Float
schema create 		name=Boolean_Type			flavour=Java		schema=java.lang.Boolean
schema create 		name=Integer_Type			flavour=Java		schema=java.lang.Integer
schema create 		name=List_Type				flavour=Java		schema=java.util.List
schema create 		name=ArrayList_Type			flavour=Java		schema=java.util.ArrayList

#----------------------------------------------------------------------------------------------------------------------------------------------------------------

##-- Events --##

event create 				name=Intent_Event
event parameter create 		name=Intent_Event					parName=intent				schemaName=Object_Type

event create 				name=Intent_Matching_Event
event parameter create 		name=Intent_Matching_Event			parName=intent				schemaName=String_Type
event parameter create 		name=Intent_Matching_Event			parName=descriptions		schemaName=List_Type
event parameter create 		name=Intent_Matching_Event			parName=top_n				schemaName=Integer_Type

event create 				name=Intent_Matching_Result
event parameter create 		name=Intent_Matching_Result			parName=intent-matching		schemaName=Object_Type
event parameter create 		name=Intent_Matching_Result			parName=intent				schemaName=String_Type

event create 				name=Report_Event			
event parameter create 		name=Report_Event					parName=report				schemaName=String_Type

event create 				name=Initialisation_Event			
event parameter create 		name=Initialisation_Event		parName=templateName		schemaName=String_Type
event parameter create 		name=Initialisation_Event		parName=template			schemaName=Object_Type
event parameter create 		name=Initialisation_Event		parName=url					schemaName=String_Type

event create 				name=Selected_Template_Event			
event parameter create 		name=Selected_Template_Event		parName=templateInformation		schemaName=List_Type
event parameter create 		name=Selected_Template_Event		parName=intent				schemaName=String_Type

event create 				name=REST_Action_Event			
event parameter create 		name=REST_Action_Event					parName=path				schemaName=String_Type
event parameter create 		name=REST_Action_Event					parName=method				schemaName=String_Type
event parameter create 		name=REST_Action_Event					parName=body				schemaName=Object_Type

event create 				name=Internal_Action_Event			
event parameter create 		name=Internal_Action_Event					parName=path				schemaName=String_Type
event parameter create 		name=Internal_Action_Event					parName=method				schemaName=String_Type
event parameter create 		name=Internal_Action_Event					parName=body				schemaName=Object_Type
event parameter create 		name=Internal_Action_Event					parName=action				schemaName=Object_Type

# TESTING EVENTS
event create 				name=Openfaas_Deployment_Event			
event parameter create 		name=Openfaas_Deployment_Event			parName=image			schemaName=String_Type
event parameter create 		name=Openfaas_Deployment_Event			parName=service			schemaName=String_Type

event create 				name=Intent_Provider_Action_Event			
event parameter create 		name=Intent_Provider_Action_Event		parName=testOne				schemaName=String_Type
event parameter create 		name=Intent_Provider_Action_Event		parName=testTwo				schemaName=String_Type
event parameter create 		name=Intent_Provider_Action_Event		parName=testThree			schemaName=String_Type

#----------------------------------------------------------------------------------------------------------------------------------------------------------------

##-- Albums --##
album create				name=FunctionalityTemplateAlbum			scope=GLOBAL		writable=true	schemaName=Object_Type
album create				name=FunctionalityTemplateLocationAlbum			scope=GLOBAL		writable=true	schemaName=Object_Type
album create				name=IntentParameterAlbum				scope=GLOBAL		writable=true	schemaName=Object_Type

#----------------------------------------------------------------------------------------------------------------------------------------------------------------

##-- TASKS --##

task create					name=Initialisation_Task
task inputfield create		name=Initialisation_Task				fieldName=templateName					schemaName=String_Type
task inputfield create		name=Initialisation_Task				fieldName=template						schemaName=Object_Type
task outputfield create		name=Initialisation_Task				fieldName=report						schemaName=String_Type
task contextref create		name=Initialisation_Task				albumName=FunctionalityTemplateAlbum
task contextref create		name=Initialisation_Task				albumName=FunctionalityTemplateLocationAlbum
task logic create			name=Initialisation_Task				logicFlavour=JAVASCRIPT					logic=LS
#MACROFILE:"logic/Initialisation_Task_TL.js"
LE

task create					name=New_Intent_Task
task inputfield create		name=New_Intent_Task					fieldName=intent						schemaName=Object_Type
task outputfield create		name=New_Intent_Task					fieldName=intent						schemaName=String_Type
task outputfield create		name=New_Intent_Task					fieldName=descriptions					schemaName=List_Type
task outputfield create		name=New_Intent_Task					fieldName=top_n							schemaName=Integer_Type
task contextref create		name=New_Intent_Task					albumName=FunctionalityTemplateAlbum
task contextref create		name=New_Intent_Task					albumName=IntentParameterAlbum
task logic create			name=New_Intent_Task					logicFlavour=JAVASCRIPT					logic=LS
#MACROFILE:"logic/New_Intent_Task_TL.js"
LE

task create					name=Template_Identification_Task
task inputfield create		name=Template_Identification_Task		fieldName=intent-matching				schemaName=Object_Type
task inputfield create		name=Template_Identification_Task		fieldName=intent						schemaName=String_Type
task outputfield create		name=Template_Identification_Task		fieldName=templateInformation			schemaName=List_Type
task outputfield create		name=Template_Identification_Task		fieldName=intent						schemaName=String_Type
task contextref create		name=Template_Identification_Task		albumName=FunctionalityTemplateAlbum
task logic create			name=Template_Identification_Task		logicFlavour=JAVASCRIPT					logic=LS
#MACROFILE:"logic/Template_Identification_Task_TL.js"
LE

task create					name=REST_Action_Builder_Task
task inputfield create		name=REST_Action_Builder_Task		fieldName=templateInformation			schemaName=List_Type
task inputfield create		name=REST_Action_Builder_Task		fieldName=intent						schemaName=String_Type
task outputfield create		name=REST_Action_Builder_Task		fieldName=path							schemaName=String_Type
task outputfield create		name=REST_Action_Builder_Task		fieldName=method						schemaName=String_Type
task outputfield create		name=REST_Action_Builder_Task		fieldName=body							schemaName=Object_Type
task contextref create		name=REST_Action_Builder_Task		albumName=FunctionalityTemplateAlbum
task contextref create		name=REST_Action_Builder_Task		albumName=FunctionalityTemplateLocationAlbum
task contextref create		name=REST_Action_Builder_Task		albumName=IntentParameterAlbum
task logic create			name=REST_Action_Builder_Task		logicFlavour=JAVASCRIPT					logic=LS
#MACROFILE:"logic/REST_Action_Builder_Task_TL.js"
LE

task create					name=Internal_Action_Builder_Task
task inputfield create		name=Internal_Action_Builder_Task		fieldName=templateInformation			schemaName=List_Type
task outputfield create		name=Internal_Action_Builder_Task		fieldName=action						schemaName=Object_Type
task contextref create		name=Internal_Action_Builder_Task		albumName=FunctionalityTemplateAlbum
task logic create			name=Internal_Action_Builder_Task		logicFlavour=JAVASCRIPT					logic=LS
#MACROFILE:"logic/Internal_Action_Builder_Task_TL.js"
LE

#----------------------------------------------------------------------------------------------------------------------------------------------------------------

##-- POLICIES --##

policy create					name=Initialisation_Policy			template=FREEFORM					firstState=Initialisation_State
policy state create				name=Initialisation_Policy			stateName=Initialisation_State		triggerName=Initialisation_Event		defaultTaskName=Initialisation_Task
policy state output	create		name=Initialisation_Policy			stateName=Initialisation_State		outputName=Initialisation_Report 		eventName=Report_Event
policy state taskref create		name=Initialisation_Policy			stateName=Initialisation_State		taskName=Initialisation_Task			outputType=DIRECT				outputName=Initialisation_Report

policy create								name=Intent_Execution_Policy		template=FREEFORM							firstState=Template_Identification_State

policy state create							name=Intent_Execution_Policy		stateName=REST_Action_Builder_State				triggerName=Selected_Template_Event				defaultTaskName=REST_Action_Builder_Task
policy state output	create					name=Intent_Execution_Policy		stateName=REST_Action_Builder_State				outputName=actionREST 							eventName=REST_Action_Event
policy state taskref create					name=Intent_Execution_Policy		stateName=REST_Action_Builder_State				taskName=REST_Action_Builder_Task				outputType=DIRECT				outputName=actionREST

policy state create							name=Intent_Execution_Policy		stateName=Internal_Action_Builder_State			triggerName=Selected_Template_Event				defaultTaskName=Internal_Action_Builder_Task
policy state output	create					name=Intent_Execution_Policy		stateName=Internal_Action_Builder_State			outputName=actionInternal 						eventName=Internal_Action_Event
policy state taskref create					name=Intent_Execution_Policy		stateName=Internal_Action_Builder_State			taskName=Internal_Action_Builder_Task			outputType=DIRECT				outputName=actionInternal

policy state create							name=Intent_Execution_Policy		stateName=Template_Identification_State		triggerName=Intent_Matching_Result			defaultTaskName=Template_Identification_Task
policy state output	create					name=Intent_Execution_Policy		stateName=Template_Identification_State		outputName=templateSelectionREST 			eventName=Selected_Template_Event	nextState=REST_Action_Builder_State
policy state output	create					name=Intent_Execution_Policy		stateName=Template_Identification_State		outputName=templateSelectionInternal 		eventName=Selected_Template_Event	nextState=Internal_Action_Builder_State
policy state contextref create				name=Intent_Execution_Policy		stateName=Template_Identification_State		albumName=FunctionalityTemplateAlbum

policy state finalizerlogic create			name=Intent_Execution_Policy  		stateName=Template_Identification_State 	finalizerLogicName=Finalizer_Logic 			logicFlavour=JAVASCRIPT logic=LS
#MACROFILE:"logic/Intent_Execution_Policy_SSL.js"
LE
policy state taskref create					name=Intent_Execution_Policy		stateName=Template_Identification_State		taskName=Template_Identification_Task		outputType=LOGIC					outputName=Finalizer_Logic

policy create					name=New_Intent_Policy				template=FREEFORM							firstState=New_Intent_State
policy state create				name=New_Intent_Policy				stateName=New_Intent_State					triggerName=Intent_Event					defaultTaskName=New_Intent_Task
policy state output	create		name=New_Intent_Policy				stateName=New_Intent_State					outputName=intent_matching_event 			eventName=Intent_Matching_Event
policy state taskref create		name=New_Intent_Policy				stateName=New_Intent_State					taskName=New_Intent_Task					outputType=DIRECT				outputName=intent_matching_event

#-------------------------------------------------------------------------------------------------------------------------------------------------
