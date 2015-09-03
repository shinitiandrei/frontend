@echo off
color 0F

TITLE Meta prod Install
type UOLSAC.dat

cd ../../../
git clone https://gituol.intranet/camaleao/meta-templates-prod.git
cd meta-templates-prod/sac.uol.com.br/sac-metatemplate
dir
pause