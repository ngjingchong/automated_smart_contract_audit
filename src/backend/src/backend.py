from flask import Flask, request, jsonify
from flask_cors import CORS
# from slither.detectors import all_detectors
import inspect
# from slither.detectors.abstract_detector import DetectorClassification, AbstractDetector
import json


api = Flask(__name__)
cors = CORS(api)

import sys
import os
# os.system('cmd /c "pip install -r requirements.txt"')

# contracts = ["Vault.sol", "Reentrancy.sol"] #get name of contracts to be audited in this session
# for c in contracts:
  # os.system('cmd /c "slither ./contracts/' + c + ' --solc-remaps @openzeppelin=../../node_modules/@openzeppelin --json ./src/reports/report_'+ c +'.json"')


# file_path = r'.\contracts\Reentrancy.sol'    
# try:
#   with open(file_path, "r+") as fp:
#     # reading the contents before writing
#     # print(fp.read())
#     # os.system('cmd /c "slither ' + fp.name + ' --solc-remaps @openzeppelin=../../node_modules/@openzeppelin --detect reentrancy-eth,reentrancy-no-eth,reentrancy-benign,reentrancy-events,reentrancy-unlimited-gas --json ./src/reports/report_testing.json"')
#     fp.close()
# except FileNotFoundError:
#     print("Please check the path.")

@api.route('/upload-contracts', methods=['GET', 'POST'])
def contract_uploaded():
  contracts = [{
    "name": "Nagato",
    "about" :"Hello! I'm a full stack developer that loves python and javascript"
  }]
  if request.method == 'POST':
    # contracts = json.loads(request.data)
    # file = contracts['contracts'][0]
    # try:
    #   os.system('cmd /c "slither ' + file['path'] + ' --solc-remaps @openzeppelin=../../node_modules/@openzeppelin --json ./src/reports/report_testing.json"')
    # except:
    #   print("Oops!", sys.exc_info()[0], "occurred.")
    # print()
    files = request.form.to_dict()
    
    # Iterate over the files and save them
    # print(files)
    # print(files.values())
    
    return(request.form.values())
    # for file in files:
      # file.save(os.path.join('/uploads', file.filename))
    temp = []
    for value in files:
    #   os.system('cmd /c "slither ' + value + ' --solc-remaps @openzeppelin=../../node_modules/@openzeppelin --json ./src/reports/report_testing.json"')
      # temp.append({
      #   "file": value
      # })
      print(value)
      # print("\n\n\n")
    # for file in files:
      # Save the file to the desired location
      # print(file[0])
      # os.system('cmd /c "slither ' + file + ' --solc-remaps @openzeppelin=../../node_modules/@openzeppelin --json ./src/reports/report_testing.json"')


    # print(data)
    return json.loads(json.dumps(temp))
    contracts.append(request.files)
  return contracts

@api.route('/scan', methods=['GET', 'POST'])
def scan_contracts():
  if request.method == 'POST':
    try: 
      detector_list = json.loads(request.data)
      detectors_str = ','.join(detector_list['detectors'])

      # os.system('cmd /c "slither ' + file_path + ' --solc-remaps @openzeppelin=../../node_modules/@openzeppelin --detect ' + detectors_str +' --json ./src/reports/report_testing.json"')

      return detectors_str
    except:
        print("Oops!", sys.exc_info()[0], "occurred.")
        print("Next entry.") 
        print()
  
  # get detector chosen to be scan and perform scanning
  # upon scanning completion, save the result as json file
  return "hello"

@api.route('/detectors', methods=['GET'])
def available_detectors():
  """ To obtain all the published detectors in the library """
  # detectors_ = dir(all_detectors)
  # detectors = [d for d in dir(all_detectors) if d[0].isalpha()]
  # print(len(*detectors))    #print length of the detectors
  # print(*detectors, sep='\n') #print each item in detectors in new line

  # detectors_ = [getattr(all_detectors, name) for name in dir(all_detectors)]
  # detectors = [d for d in detectors_ if inspect.isclass(d) and issubclass(d, AbstractDetector)]
  # for index, detector in enumerate(detectors):
  #   confident_level = -1
  #   impact_level = -1
  #   print(str(index) + "Impact : " + detector.IMPACT.name + " > " + str(detector.IMPACT.value))
  #   print(str(index) + "Confident : " + detector.CONFIDENCE.name + " > " + str(detector.CONFIDENCE.value))

  # for dir in detectors_dictionary:
  #   print(detectors_dictionary[dir])
  
  detectors_ = [getattr(all_detectors, name) for name in dir(all_detectors)]
  detectors = [d for d in detectors_ if inspect.isclass(d) and issubclass(d, AbstractDetector)]
  detectors_json = []
  detectors_dictionary = {
    "reentrancy": ["reentrancy-eth", "reentrancy-no-eth", "reentrancy-benign", "reentrancy-events", "reentrancy-unlimited-gas"],
    "obselete_elements":["constant-function-asm", "constant-function-state", "deprecated-standards", "pragma", "solc-version"],
    "access_control": ["protected-vars", "suicidal", "unprotected-upgrade", "variable-scope", "events-access", "events-maths"],
    "interface": ["domain-separator-collision", "erc20-interface", "erc721-interface", "erc20-indexed"],
    "missing_initialization": ["uninitialized-state", "uninitialized-storage", "uninitialized-local", "uninitialized-fptr-cst", "void-cst", "function-init-state"],
    "treacherous_elements_usage": ["backdoor", "shadowing-state", "controlled-delegatecall", "shadowing-abstract", "tx-origin", "shadowing-builtin", "shadowing-local", "assembly", "rtlo", "public-mappings-nested"],
    "erroneous_usage": ["weak-prng", "timestamp", "similar-names", "too-many-digits"],
    "redundancy": ["multiple-constructors", "name-reused", "write-after-write", "reused-constructor", "unused-return", "redundant-statements", "unimplemented-functions", "unused-state", "dead-code"],
    "storage_manipulation": ["abiencoderv2-array", "array-by-reference", "storage-array"],
    "best_practices": ["incorrect-shift", "controlled-array-length", "unchecked-transfer", "incorrect-equality", "locked-ether", "mapping-deletion", "divide-before-multiply", "unchecked-lowlevel", "unchecked-send", "incorrect-modifier", "incorrect-unary", "missing-zero-check", "assert-state-change", "missing-inheritance", "naming-convention", "constable-states", "external-function"],
    "low_level": ["arbitrary-send-erc20", "arbitrary-send-erc20-permit", "arbitrary-send-eth", "low-level-calls"],
    "contraditions_affirmation": ["enum-conversion", "tautology", "boolean-cst", "boolean-equal"],
    "loops": ["delegatecall-loop", "msg-value-loop", "calls-loop", "costly-loop"]
  }

  for d in detectors_dictionary:
    detector_info = [{
      "id": str(d),
      "detectors": detectors_dictionary[d]
    }]
    for index, detector in enumerate(detectors):
      if detector.ARGUMENT in detectors_dictionary[d]:
        confident_level = matrix_mapping(detector.CONFIDENCE.value)
        impact_level = matrix_mapping(detector.IMPACT.value)
        detector_info.append({
          "id": index, 
          "code": detector.ARGUMENT,
          "matrix": {
            "Overall_Risk_Level": 3,
            "Likelihood_Level": confident_level,
            "Impact_Level": impact_level},
            # "Likelihood_value": detector.CONFIDENCE.name,
            # "Impact_value": detector.IMPACT.name},
          "description": [
            {"title": "Description", "content": detector.WIKI_DESCRIPTION},
            {"title": "Consequences", "content": detector.WIKI_RECOMMENDATION}],
        })
    detectors_json.append(detector_info)
  return json.loads(json.dumps(detectors_json))

def matrix_mapping (matrix):
  if (matrix == 0): #High - 50
    return 4
  elif (matrix == 1): #Medium -30
    return 3
  elif (matrix == 2): #Low - 15
    return 2
  elif (matrix == 3): #Informational -5
    return 1
  else: #Optimization
    return 0

@api.route('/data')
def display_report():
  
  file_path = r'.\src\reports\report_Reentrancy.sol.json'    
  try:
    with open(file_path, "r+") as fp:
      # reading the contents before writing
      return (json.loads(fp.read()))
      fp.close()
  except FileNotFoundError:
    print("Please check the path.")


  # with open('../reports/report_Reentrancy.sol.json') as result:
  #   report = json.load(result)
  #   print(report)
  return file_path

if __name__ == "__main__":
  api.run(debug=True)