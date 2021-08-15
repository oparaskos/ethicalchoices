


## Troubleshooting:

### docker-compose up on windows vm.max_map_count

```
    # Open Powershell
    PS C:\Users\oliver> wsl -d docker-desktop
    $ sysctl -w vm.max_map_count=262144
    $ echo "vm.max_map_count = 262144" > /etc/sysctl.d/99-docker-desktop.conf
```