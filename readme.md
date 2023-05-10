## dependency
Run the command `npm init -y` to create a new package.json file.
Run the command `npm install fs path` to install the fs and path modules.

## working
Put some JSON files in the `jsonfiles` folder.
Run the command `node index.js` to run the script and convert the JSON files to CSV files.

## obter logs mensais

SSH na máquina

Go to:
`cd /var/lib/docker/volumes/infraestrutura-desenvolvimento_server_data/_data/server/atl/atlanticoline-prod2`

Run:

`find -newermt "2023-01-15 00:00:00" ! -newermt "2023-02-15 00:00:00"  -type f | xargs tar -czf /home/fev2023.tar.gz`

