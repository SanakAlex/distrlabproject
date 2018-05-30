# Make sure 3 replicas available
for rs in mongo-primary mongo-secondary2 mongo-secondary1;do
  mongo --host $rs --eval 'db'
  if [ $? -ne 0 ]; then
    exit 1
  fi
done

# Connect to rs1 and configure replica set if not done
status=$(mongo --host mongo-primary --quiet --eval 'rs.status().members.length')
if [ $? -ne 0 ]; then
  # Replicaset not yet configured
  mongo --host mongo-primary --eval 'rs.initiate({ _id: "mongodb-replica", version: 1, members: [ { _id: 0, host : "mongo-primary:27017" }, { _id: 1, host : "mongo-secondary2:27017" }, { _id: 2, host : "mongo-secondary1:27017" } ] })';
fi