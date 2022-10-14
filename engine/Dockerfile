FROM onap/policy-apex-pdp:2.7.0
WORKDIR /home/apexuser

RUN pip install requests
RUN pip install Flask

COPY /policy-apex/* ./policy-apex/
RUN mkdir -p ./policy-json
COPY /policy-json/* ./policy-json/
COPY /logic/* ./logic/
COPY /schema/* ./schema/
COPY /config/* ./config/
COPY /logs/logback.xml /opt/app/policy/apex-pdp/etc/
COPY /tosca-template/* ./tosca-template/

COPY /scripts/* ./

EXPOSE 12345 18989 23324 8080 6969 5001

RUN apexCLIToscaEditor.sh -c policy-apex/Policy.apex -ot policy-json/Policy.json -l ./test.log -ac config/config.json -t ./tosca-template/ToscaTemplate.json
CMD ["./start.sh"]

#CMD ["./startTest.sh"]

#CMD ["./cmd.sh"]
