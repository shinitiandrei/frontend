@echo off
color 0F

TITLE Meta Staging Install
type UOLSAC.dat

cd ../../../
git clone https://gituol.intranet/camaleao/meta-templates-staging.git
cd meta-templates-staging/sac.uol.com.br/sac-metatemplate
dir
pause