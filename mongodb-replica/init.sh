# Make sure 3 replicas available
hosts="mongo-primary mongo-secondary2 mongo-secondary1"
for rs in ${hosts}
do
  mongo --host ${rs} --eval 'db'
  if [ $? -ne 0 ]; then
    exit 1
  fi
done

# Connect to rs1 and configure replica set if not done
status=$(mongo --host mongo-primary --quiet --eval 'rs.status().members.length')
if [ $? -ne 0 ]; then
  # Replicaset not yet configured
  mongo --host rs1 --eval 'rs.initiate({ "_id": "mongodb-replica", "version": 1, "members" : [ {"_id": 1, "host": "mongo-primary:27017"}, {"_id": 2, "host": "mongo-secondary2:27017"}, {"_id": 3, "host": "mongo-secondary1:27017"} ] })';
fi