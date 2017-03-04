rem Start Master
START "Elasticsearch Charmander" /D "C:\Development\LingoZen\Elasticsearch_Node0\bin" elasticsearch.bat
ping 127.0.0.1 -n 20 > nul

rem Start Slave 1
START "Elasticsearch Squirtle" /D "C:\Development\LingoZen\Elasticsearch_Node1\bin" elasticsearch.bat
ping 127.0.0.1 -n 20 > nul

rem Start Slave 2
rem START "Elasticsearch Bulbasaur" /D "C:\Development\LingoZen\Elasticsearch_Node2\bin" elasticsearch.bat
