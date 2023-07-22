import os
from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

home_dir = os.path.expanduser("~")
run_dir = os.path.join(home_dir, 'run')
audio_run_dir = os.path.join(run_dir, 'audio_run')
noir_run_dir = os.path.join(run_dir, 'noir_run')

for d in [audio_run_dir, noir_run_dir]:
    # Check if the directory exists, and create it if it doesn't
    if not os.path.exists(d):
        os.makedirs(d)

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

        # verify that the file is an audio file (for example, a WAV file)
        if file and self.allowed_file(file.filename):
            # save the file
            filename = file.filename # filename = secure_filename(file.filename)
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
                if len(left_indices) % 2 != 0:
                    raise ValueError("Number of left indices must be multiple of 2")
            except ValueError:
                return {'message': 'Invalid left indices'}, 400
            
            # Parse "bucket_datas" as a list of base64-decoded strings
            bucket_datas_str = body_parameters.get('bucket_datas', '')
            try:
                bucket_datas = [base64.b64decode(x).decode() for x in bucket_datas_str.split()]
                print('Parsed list of base64-decoded strings: ', bucket_datas)
            except ValueError:
                return {'message': 'Invalid base64 list'}, 400

            return {'message': 'Audio file uploaded successfully'}, 201

    def allowed_file(self, filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in {'wav', 'mp3', 'flac', 'aac', 'ogg'}

api.add_resource(AudioUploadAPI, '/api/audioUpload')

if __name__ == '__main__':
    app.run(debug=True)
