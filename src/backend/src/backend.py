from flask import Flask, request, jsonify
from flask_cors import CORS
from slither.detectors import all_detectors
import inspect
from slither.detectors.abstract_detector import DetectorClassification, AbstractDetector
import json


api = Flask(__name__)
cors = CORS(api)

import sys
import os

# os.system('cmd /c "pip install -r requirements.txt"')

# contracts = ["Reentrancy.sol"] #get name of contracts to be audited in this session
# for c in contracts:
#   os.system('cmd /c "slither ./contracts/' + c + ' --solc-remaps @openzeppelin=../../node_modules/@openzeppelin --detect abiencoderv2-array,array-by-reference,storage-array --json ./reports/report_'+ c +'.json"')


# file_path = r'.\contracts\Reentrancy.sol'    
# try:
#   with open(file_path, "r+") as fp:
#     # reading the contents before writing
#     # print(fp.read())
#     # os.system('cmd /c "slither ' + fp.name + ' --solc-remaps @openzeppelin=../../node_modules/@openzeppelin --detect reentrancy-eth,reentrancy-no-eth,reentrancy-benign,reentrancy-events,reentrancy-unlimited-gas --json ./src/reports/report_testing.json"')
#     fp.close()
# except FileNotFoundError:
#     print("Please check the path.")

detectors_dictionary = {
  "all": [],
  "reentrancy": ["reentrancy-eth", "reentrancy-no-eth", "reentrancy-benign", "reentrancy-events", "reentrancy-unlimited-gas"],
  # "obselete_elements":["constant-function-asm", "constant-function-state", "deprecated-standards", "pragma", "solc-version"],
  # "access_control": ["protected-vars", "suicidal", "unprotected-upgrade", "variable-scope", "events-access", "events-maths"],
  # "interface": ["domain-separator-collision", "erc20-interface", "erc721-interface", "erc20-indexed"],
  # "missing_initialization": ["uninitialized-state", "uninitialized-storage", "uninitialized-local", "uninitialized-fptr-cst", "void-cst", "function-init-state"],
  # "treacherous_elements_usage": ["backdoor", "shadowing-state", "controlled-delegatecall", "shadowing-abstract", "tx-origin", "shadowing-builtin", "shadowing-local", "assembly", "rtlo", "public-mappings-nested"],
  # "erroneous_usage": ["weak-prng", "timestamp", "similar-names", "too-many-digits"],
  # "redundancy": ["multiple-constructors", "name-reused", "write-after-write", "reused-constructor", "unused-return", "redundant-statements", "unimplemented-functions", "unused-state", "dead-code"],
  "storage_manipulation": ["abiencoderv2-array", "array-by-reference", "storage-array"],
  # "best_practices": ["incorrect-shift", "controlled-array-length", "unchecked-transfer", "incorrect-equality", "locked-ether", "mapping-deletion", "divide-before-multiply", "unchecked-lowlevel", "unchecked-send", "incorrect-modifier", "incorrect-unary", "missing-zero-check", "assert-state-change", "missing-inheritance", "naming-convention", "constable-states", "external-function"],
  # "low_level": ["arbitrary-send-erc20", "arbitrary-send-erc20-permit", "arbitrary-send-eth", "low-level-calls"],
  # "contraditions_affirmation": ["enum-conversion", "tautology", "boolean-cst", "boolean-equal"],
  # "loops": ["delegatecall-loop", "msg-value-loop", "calls-loop", "costly-loop"]
  "": [],
}

@api.route('/scan_vulnerabilities', methods=['GET', 'POST'])
def contract_uploaded():
  if request.method == 'POST':
    # detector selected by user
    if(request.form.get("detector") != "all"):
      detector_selected = request.form.get("detector")
      detector_selected = ','.join(detectors_dictionary[detector_selected])
      detector_selected = "--detect " + detector_selected
    else:
      detector_selected = ""

    # files passed in to be scanned
    files = request.files
    for f in files:
      # print(f)    
      # f.stream.seek(0)
      files[f].save(os.path.join("./contracts", f))
      os.system('cmd /c "slither ./contracts/'+ str(f) +' --solc-remaps @openzeppelin=../../node_modules/@openzeppelin ' + detector_selected + ' --json ./reports/report_'+ f +'.json"')
  return "Success"

@api.route('/detectors', methods=['GET'])
def available_detectors():
  """ To obtain all the published detectors in the library """  
  detectors_ = [getattr(all_detectors, name) for name in dir(all_detectors)]
  detectors = [d for d in detectors_ if inspect.isclass(d) and issubclass(d, AbstractDetector)]
  detectors_json = []

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

@api.route('/file')
def display_file():
  dir_path = r"\automated_smart_contract_audit\src\backend\src\contracts"
  res = os.listdir(dir_path)
  return res
  fp.close()

@api.route('/report')
def display_report():
  dir_path = r"\automated_smart_contract_audit\src\backend\src\reports"
  res = os.listdir(dir_path)
  return res
  fp.close()

@api.route('/data', methods=['POST', 'GET'])
def display_report_result():
  if request.method == 'POST':
    req = request.data.decode('UTF-8')
    req2 = req.replace('["','')
    req3 = req2.replace('"]','')
    file_path = r'\automated_smart_contract_audit\src\backend\src\reports\\' + req3
    try:
      with open(file_path, "r+") as fp:
        # reading the contents before writing
        return (json.loads(fp.read()))
        fp.close()
    except FileNotFoundError:
      print("Please check the path.")
  return file_path

@api.route('/deleteContract', methods=['POST', 'GET'])
def delete_contract():
  if request.method == 'POST':
    req = request.data.decode('UTF-8')
    req2 = req.replace('["','')
    req3 = req2.replace('"]','')
    print(req)
    file_path = r'\automated_smart_contract_audit\src\backend\contracts\\' + req3
    res = os.remove(file_path)
  return file_path

@api.route('/deleteReport', methods=['POST', 'GET'])
def delete_report():
  if request.method == 'POST':
    req = request.data.decode('UTF-8')
    req2 = req.replace('["','')
    req3 = req2.replace('"]','')
    print(req)
    file_path = r'.\\src\\reports\\' + req3
    res = os.remove(file_path)
  return file_path

if __name__ == "__main__":
  api.run(debug=True)