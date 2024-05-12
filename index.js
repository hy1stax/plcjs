//Lib for plc communication
//First case is panasonic plc, following is omron

//Panasonic PLC code here
class panasonic{
  //Validate input for panasonic plc
  PanFormatChk(inputs)
  {
    let result = false;
    if (inputs == null)
    {
      console.log("Input incorrect, a parameter required, example PanSwitchOn('X0000').");
      return;
    }
    result = false;
    if (len(inputs) != 5)
    {
      console.log("Input incorrect, the correct should be like R0001, 5 chars.");
      return;
    }else
    {
      let pattern = /^[RXYT]\d{4}$/;
      if(pattern.test(inputs))
      {
        result = true;
      }else
      {
        console.log("Input incorrect, the relay should be X,Y,T,R, follow by four char. ex: R0001");
      }
    }
    return result;
  }

  //Panasonic PLC communication, check version.
  PanasonicVer(){
      return "%EE#RT**"+ "\r";
  }

  //Swtich on a contact
  PanSwitchOn(contact)
  {
    if(!PanFormatChk(contact))
    {
      return;
    }
    return "%EE#WCS"+contact+"1**"+"\r";
  }

  //Switch off a contact
  PanSwitchOff(contact)
  {
    if(!PanFormatChk(contact))
    {
      return;
    }
    return "%EE#WCS"+contact+"1**"+"\r";
  }

  //Switch on a range of contacts
  PanSWMultiOn(start,end)
  {
    if(start == null || end == null)
    {
      console.log("Input incorrect, two parameter required, example PanSWMultiOn('X0000','X0009').");
      return;
    }
    if(!PanFormatChk(start) || !PanFormatChk(start))
    {
      return;
    }
    return"%EE#WCP"+start+end+"1**"+"\r";
  }

  //Switch off a range of contacts
  PanSWMultiOff(start,end)
  {
    if(start == null || end == null)
    {
      console.log("Input incorrect, two parameter required, example PanSWMultiOn('X0000','X0009').");
      return;
    }
    if(!PanFormatChk(start) || !PanFormatChk(start))
    {
      return;
    }
    return"%EE#WCP"+start+end+"0**"+"\r";
  }

  //Read a contact status
  PanReadSingle(contact)
  {
    if(!PanFormatChk(contact))
    {
      return;
    }
    return "%EE#RCS"+contact+"**"+"\r";
  }

  //Read a range contacts status
  PanReadMulti(start,end)
  {
    if(start == null || end == null)
    {
      console.log("Input incorrect, two parameter required, example PanSWMultiOn('X0000','X0009').");
      return;
    }
    if(!PanFormatChk(start) || !PanFormatChk(start))
    {
      return;
    }
    return "%EE#RCP" + start + end + "**" + "\r"
  }

  //Read register
  PanReadDT(start, end)
  {
    if(start == null || end == null)
    {
      console.log("Input incorrect, two parameter required, example PanSWMultiOn('X0000','X0009').");
      return;
    }
    if(start == null || end == null)
    {
      console.log("Missing parameter, there are two parameters, example: PanReadDT(0001,1234)");
      return;
    }
    let pattern = /^[0-9]+$/;
    if(!pattern.test(start) || !pattern.test(end))
    {
      console.log("Input incorrect, please input 4 digit each, example: PanReadDT(0001,1234)");
      return;
    }
    return "%EE#RDD"+str(Start)+str(End)+"**"+"\r"
  }
}

module.exports = panasonic;