@echo off
color 0F

TITLE Meta QA Install
type UOLSAC.dat

cd ../../../
git clone https://gituol.intranet/camaleao/meta-templates-qa.git
cd meta-templates-qa/sac.uol.com.br/sac-metatemplate
dir
pause