pragma solidity >=0.4.22 <0.6.0;

contract Reuniones{

    struct foto{
        uint id;
        string hash;
        string url;
    }

    struct reunion {
        uint id;
        string tema;
        string fecha;
        uint numF;
        mapping (uint => foto) fotos;
    }

    mapping (uint => reunion) private reuniones;

    constructor() public{}

    function registrarReunion(uint _idReunion, string memory _tema, string memory _fecha) public{
      reuniones [_idReunion] = reunion(_idReunion, _tema, _fecha, 0);
    }

    function registrarFoto(uint _idReunion, string memory _hash, string memory _url, uint _idFoto) public{
        reuniones[_idReunion].fotos[_idFoto] = foto(_idFoto, _hash, _url);
        reuniones[_idReunion].numF++;
    }

    function buscarFoto(uint _idReunion, uint _idFoto) public view returns (string memory, string memory){

        string memory fHash = reuniones[_idReunion].fotos[_idFoto].hash;
        string memory url = reuniones[_idReunion].fotos[_idFoto].url;

        return(fHash, url);
    }

    function buscarReunion(uint _idReunion) public view returns (string memory, string memory, uint){
        return(reuniones[_idReunion].tema, reuniones[_idReunion].fecha, reuniones[_idReunion].numF);
    }

    function numFotosxReunion(uint _idReunion) public view returns (uint){
        return(reuniones[_idReunion].numF);
    }

    function validarFoto(uint _idReunion, uint _idFoto, string memory _hash) public view returns (bool){
        return(uint(keccak256(abi.encodePacked(reuniones[_idReunion].fotos[_idFoto].hash)))==uint(keccak256(abi.encodePacked(_hash))));
    }

}
