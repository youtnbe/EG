var stackTrace = require('stack-trace');  // ��� ��������� ����� ������������� ������
var util = require('util'); //util.inspect()
var path = require('path'); //path.relative() path.sep
var projectname = require('../package').name; //package.json -> project name

module.exports = class Logger // ����� ������ :)
{
    constructor()
    {
        function generateLogFunction(level) // ������� ��������� ������ ������� :)
        {
            return function(message,meta)
            {
                //var d = Date.now(); // ����� ����� ���������� ����� ������
                var mes = this.module + " -- ";
                mes += level + " -- ";
                mes += message; // ��������� ���������
                if(meta) mes += "  " + util.inspect(meta) + " "; // �������� ��� ���� (Object||Error)
                mes += '\n'; // ����� ������ :)

                this.write(mes);
                // �������� �� ��� ������ ���� ���������
            }
        };

        this.trace = stackTrace.get()[1]; // �������� ���� ������
        this.filename = this.trace.getFileName(); // �������� ��� ����� ������� ������� �����������
        this.module = projectname + path.sep + path.relative('.',this.filename); // �������� ��� ������
        this.streams = [process.stdout]; // ������ � ������� �� ����� ���������� ����
        // � ���������� ����� ����� ����� � �����
        this.log = generateLogFunction('Log'); // ��� ���������
        this.info = generateLogFunction('Info'); // ��� �������������
        this.error = generateLogFunction('Error'); // ��� ������
        this.warn = generateLogFunction('Warning'); // ��� ��������������
    }
    write(d)
    {
        this.streams.forEach((stream)=>{
            stream.write(d);
        });
    }
}