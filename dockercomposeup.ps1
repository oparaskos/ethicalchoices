wsl -d docker-desktop sysctl -w vm.max_map_count=262144
start "C:\Program Files\Docker\Docker\Docker Desktop.exe"
docker compose up
