@echo off

SET "mySqlServiceName=MySQL57"

REM CALL:installGlobalNodePackages
CALL:installLocalNodePackages
CALL:startMySqlServiceIfNotRunning
CALL:startEsClusterIfNotRunning
CALL:setupEsClusterIndices
CALL:dropAllTablesInDatabase
CALL:populateDataStores

GOTO:EOF


REM ------------------------------------
REM Checks if the mysql service is running, if it is not then it starts it
REM -------------------------------------
:startMySqlServiceIfNotRunning
ECHO Starting MySQL services
FOR /F "tokens=3 delims=: " %%H in ('sc query %mySqlServiceName% ^| findstr "        STATE"') DO (
    IF /I "%%H" NEQ "RUNNING" (
       NET START %mySqlServiceName%
    )
)
ECHO MySQL service is running
GOTO:EOF


REM ------------------------------------
REM Checks if all node in the es cluster are running, if it is not then it starts it
REM -------------------------------------
:startEsClusterIfNotRunning
ECHO Starting ES Clusters

REM Start Node 0 - Charmander
CALL "C:\Development\LingoZen\Elasticsearch_Node0\bin\elasticsearch-service.bat" install "EsNode_Charmander"
CALL "C:\Development\LingoZen\Elasticsearch_Node0\bin\elasticsearch-service.bat" start "EsNode_Charmander"

REM Start Node 1 - Squirtle
CALL "C:\Development\LingoZen\Elasticsearch_Node1\bin\elasticsearch-service.bat" install "EsNode_Squirtle"
CALL "C:\Development\LingoZen\Elasticsearch_Node1\bin\elasticsearch-service.bat" start "EsNode_Squirtle"

REM Start Node 2 - Bulbasaur
CALL "C:\Development\LingoZen\Elasticsearch_Node2\bin\elasticsearch-service.bat" install "EsNode_Bulbasaur"
CALL "C:\Development\LingoZen\Elasticsearch_Node2\bin\elasticsearch-service.bat" start "EsNode_Bulbasaur"

ECHO ES Cluster is running
GOTO:EOF


REM ------------------------------------
REM Installs all global packages needed by the application
REM -------------------------------------
:installGlobalNodePackages
ECHO Installing all Global Node Packages
CALL npm install -g @angular/cli typescript pm2
ECHO Installed all Global Node Packages
GOTO:EOF


REM ------------------------------------
REM Installs all local packages needed by the application
REM -------------------------------------
:installLocalNodePackages
ECHO Installing all Local Node Packages
CALL npm install
ECHO Installed all Local Node Packages
GOTO:EOF


REM ------------------------------------
REM Creates/Updates the elasticsearch indices and mappings
REM -------------------------------------
:setupEsClusterIndices
ECHO Setting up the elasticsearch cluster indices
CALL node ./scripts/create-es-index.js
ECHO Set up the elasticsearch cluster indices
GOTO:EOF


REM ------------------------------------
REM Drops all tables in database
REM -------------------------------------
:dropAllTablesInDatabase
ECHO Not yet implemented
GOTO:EOF


REM ------------------------------------
REM Populates data stores with data
REM -------------------------------------
:populateDataStores
ECHO Populating Data Stores
CALL node ./scripts/generate-fake-data.js
ECHO Populated Data Stores
GOTO:EOF
