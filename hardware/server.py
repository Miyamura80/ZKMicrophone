import os
import shutil
import re
import base64
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import subprocess


app = Flask(__name__)
# cors = CORS(app, resources={r'/*': {'origins': '*',
                                    # 'methods': ['GET', 'POST', 'PUT', 'DELETE']}})
api = Api(app)

home_dir = os.path.expanduser("~")
run_dir = os.path.join(home_dir, 'run')
audio_run_dir = os.path.join(run_dir, 'audio_run')
noir_run_dir = os.path.join(run_dir, 'noir_run')
noir_run_src_dir = os.path.join(noir_run_dir, 'src')

bleeps_spec_filename = os.path.join(noir_run_dir, 'bleeps.spec')

for d in [audio_run_dir, noir_run_dir, noir_run_src_dir]:
    # Check if the directory exists, and create it if it doesn't
    if not os.path.exists(d):
        os.makedirs(d)

root_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)))
circuits_dir = os.path.join(root_dir, 'circuits')
noir_transform_audio_dir = os.path.join(circuits_dir, 'transform_audio')
noir_main_path = os.path.join(noir_transform_audio_dir, 'src', 'main.nr')
noir_nargo_path = os.path.join(noir_transform_audio_dir, 'Nargo.toml')

shutil.copy(noir_main_path, os.path.join(noir_run_src_dir, 'main.nr'))
shutil.copy(noir_nargo_path, os.path.join(noir_run_dir, 'Nargo.toml'))


class AudioUploadAPI(Resource):
    def post(self):
        # Fetch parameters from body
        body_parameters = request.form
        print('Body Parameters: ', body_parameters)

        # check if the post request has the file part
        if 'file' not in request.files:
            return {'message': 'No file part in the request'}, 400
        file = request.files['file']

        # if user does not select file, return bad request
        if file.filename == '':
            return {'message': 'No selected file'}, 400

        # verify that the file is an audio file (for example, a WAV file) TODO
        # save the file
        filename = file.filename
        filepath = os.path.join(audio_run_dir, filename)
        file.save(filepath)

        # bucket size - one line
        # l1 l2 l3 l4 - space separated left indices
        # bucket_l1 bucket_l2 bucket_ln - space separated base64-encoded strings

        bucket_size = int(body_parameters.get('bucket_size', 0))
        print('Parsed bucket size: ', bucket_size)
        # Parse "left_indices" as a list of integers
        left_indices_str = body_parameters.get('left_indices', '')
        try:
            left_indices = [int(x) for x in left_indices_str.split()]
            print('Parsed left indices: ', left_indices)
        except ValueError:
            return {'message': 'Invalid left indices'}, 400

        # Parse "bucket_datas" as a list of base64-decoded strings
        bucket_datas_str = body_parameters.get('bucket_datas', '')
        try:
            bucket_datas = [base64.b64decode(
                x).decode() for x in bucket_datas_str.split()]
            print('Parsed list of base64-decoded strings: ', bucket_datas)
        except ValueError:
            return {'message': 'Invalid base64 list'}, 400

        if len(left_indices) != len(bucket_datas):
            return {'message': 'Left indices and bucket datas must be the same length'}, 400

        signature_str = body_parameters.get('signature', '')
        if not signature_str.startswith('0x') or len(signature_str) != 66 or not re.fullmatch(r'0x[0-9a-fA-F]*', signature_str):
            return {'message': 'Invalid signature format. Must be length 64 hex string.'}, 400
        print('Parsed signature: ', signature_str)

        # TODO: we need to call into rado function and return the edited audio + proof
        bleeps_spec = f"""{bucket_size}
{left_indices_str}
{bucket_datas_str}
"""
        print(bleeps_spec)

        with open(bleeps_spec_filename, 'w') as file:
            file.write(bleeps_spec)

        res = subprocess.check_output(
            [
                os.path.join(noir_transform_audio_dir, "setup_custom.py"), 
                '--input_wav', filepath,
                '--output_wav', 'out.wav',
                '--bleeps_spec', bleeps_spec_filename,
                '--prover_toml_path', 'NewProver.toml',
                '--proof_output', 'lol_proof.proof'
            ], 
            cwd=noir_run_dir
        )

        print(res)

        return {'message': 'Audio file uploaded successfully', 'edited_audio': 'VGhpcyBpcyAyMiBjaGFyYWN0ZXJz', 'proof': 'VGhpcyBpcyAyMiBjaGFyYWN0ZXJz'}, 201

    def allowed_file(self, filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in {
                   'wav', 'mp3', 'flac', 'aac', 'ogg'}


api.add_resource(AudioUploadAPI, '/api/audioUpload')

if __name__ == '__main__':
    app.run(debug=True)
