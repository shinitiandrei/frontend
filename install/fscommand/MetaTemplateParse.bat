@ECHO OFF

SET metaTemplateName="sac-metatemplate"
SET metaLocation="..\..\meta-templates-prod\sac.uol.com.br\"
SET jarLocation="..\..\sac-templates\install\dependencies"
SET distLocation="..\..\sac-templates\dist"

cd %metaLocation%

java -jar -Dtemplate=%metaTemplateName% -Djson=%metaTemplateName%\setup.json -Dskin=%distLocation% %jarLocation%\cam-skin-engine.jar