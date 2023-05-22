# Comandes Joué

docker network create elastic

docker pull docker.elastic.co/elasticsearch/elasticsearch:8.7.1

docker run --name es-node01 --net elastic -p 9200:9200 -p 9300:9300 -t docker.elastic.co/elasticsearch/elasticsearch:8.7.1

 => ERROR: Elasticsearch exited unexpectedly

Correction => docker run --name es-node01 --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -t docker.elastic.co/elasticsearch/elasticsearch:8.7.1


    - Un token ainsi qu'un compte sera donné pour se connecter à l'interface de Kibana
    - Il faut se rendre sur http://0.0.0.0:5601/?code=698142 pour se connecter à Kibana

docker pull docker.elastic.co/kibana/kibana:8.7.1

docker run --name kib-01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.7.1