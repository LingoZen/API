@echo off

SET "mySqlServiceName=MySQL57"

CALL:installGlobalNodePackages
CALL:installLocalNodePackages
CALL:buildApi
CALL:startMySqlServiceIfNotRunning
CALL:startEsClusterIfNotRunning
CALL:setupEsClusterIndices
CALL:seedDatabase
CALL:serveKibana

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
CALL npm install -g pm2
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
CALL node .\scripts\create-es-index.js
ECHO Set up the elasticsearch cluster indices
GOTO:EOF

REM ------------------------------------
REM Serve kibana
REM -------------------------------------
:serveKibana
ECHO Serving Kibana
START "Serving kibana" /D "C:\Development\LingoZen\kibana\bin" .\kibana.bat serve
ECHO Served Kibana
GOTO:EOF

REM ------------------------------------
REM Build Api
REM -------------------------------------
:buildApi
ECHO Building Api
CALL npm run build
ECHO Built Api
GOTO:EOF

REM ------------------------------------
REM Seed the Database
REM -------------------------------------
:seedDatabase
ECHO Seeding database
CALL node .\scripts\seed-db.js
ECHO Seeded database
GOTO:EOF